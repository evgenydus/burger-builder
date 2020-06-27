import axios from 'axios';
import { put, delay, call } from 'redux-saga/effects'

import * as actions from '../actions'
import { authEndpoints, firebaseApiKey } from '../../appData/appData';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token' )
  yield call([localStorage, 'removeItem'], 'expirationDate' )
  yield call([localStorage, 'removeItem'], 'userId' )
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime)
  yield put(actions.logout())
}

export function* authUserSaga({ email, password, isSignUp }) {
  yield put(actions.authStart())
  const authData = {
    email,
    password,
    returnSecureToken: true,
  }

  const { signUp, signIn } = authEndpoints
  const endpoint = isSignUp ? signUp : signIn

  try {
    const response = yield axios.post(`${endpoint}${firebaseApiKey}`, authData)

    const { idToken, localId, expiresIn } = response.data
    const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000)

    yield localStorage.setItem('token', idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', localId)
    yield put(actions.authSuccess(idToken, localId))
    yield put(actions.checkAuthTimeout(expiresIn))
  } catch (error) {
    yield put(actions.authFail(error.response.data.error))
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token')

  if (!token) {
    yield put(actions.logout())
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'))

    if (expirationDate <= new Date()) {
      yield put(actions.logout())
    } else {
      const userId = yield localStorage.getItem('userId')
      const authTimeout = (expirationDate.getTime() - new Date().getTime()) / 1000

      yield put(actions.authSuccess(token, userId))
      yield put(actions.checkAuthTimeout(authTimeout))
    }
  }
}
