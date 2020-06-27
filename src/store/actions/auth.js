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
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const logoutSucceed = () => {

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expiresIn) => {
  const expirationTime = expiresIn * 1000

  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime,
  }
}

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp,
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        const authTimeout = (expirationDate.getTime() - new Date().getTime()) / 1000

        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(authTimeout))
      }
    }
  }
}
