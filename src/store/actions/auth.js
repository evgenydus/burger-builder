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

    console.log(axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQsjP9tWeeB9zyT33p0McR2DEj8ktwzYw', authData))

    axios.post(`${endpoint}${firebaseApiKey}`, authData)
      .then(response => {
        const { idToken, localId } = response.data
        console.log(response)
        dispatch(authSuccess(idToken, localId))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error))
      })
  }
}
