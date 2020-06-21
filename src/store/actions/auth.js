import axios from 'axios'

import * as actionTypes from './actionTypes'
import { firebaseApiKey, authEndpoints } from '../../appData/appData';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expiresIn) => {
  const expirationTime = expiresIn * 1000

  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const { signUp, signIn } = authEndpoints
    const endpoint = isSignUp ? signUp : signIn

    axios.post(`${endpoint}${firebaseApiKey}`, authData)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data
        console.log(response)
        dispatch(authSuccess(idToken, localId))
        dispatch(checkAuthTimeout(expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}
