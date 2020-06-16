import axios from 'axios'

import * as actionTypes from './actionTypes'
import { firebaseApiKey, authEndpoints } from '../../appData/appData';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
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

    axios.post(`${endpoint}${firebaseApiKey}`, authData)
      .then(response => {
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}
