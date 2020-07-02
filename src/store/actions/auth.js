import axios from 'axios'

import * as actionTypes from './actionTypes'
import { firebaseApiKey, authEndpoints } from '../../appData/appData'
import { resetBurger } from './burgerBuilder'

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

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')

  return { type: actionTypes.AUTH_LOGOUT }
}

export const closeSession = () => {
  return (dispatch) => {
    dispatch(logout())
    dispatch(resetBurger())
  }
}

export const checkAuthTimeout = (expiresIn) => {
  const expirationTime = expiresIn * 1000

  return (dispatch) => {
    setTimeout(() => {
      dispatch(closeSession())
    }, expirationTime)
  }
}

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart())
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const { signUp, signIn } = authEndpoints
    const endpoint = isSignUp ? signUp : signIn

    axios
      .post(`${endpoint}${firebaseApiKey}`, authData)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

        localStorage.setItem('token', idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', localId)
        dispatch(authSuccess(idToken, localId))
        dispatch(checkAuthTimeout(expiresIn))
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')

    if (!token) {
      dispatch(closeSession())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))

      if (expirationDate <= new Date()) {
        dispatch(closeSession())
      } else {
        const userId = localStorage.getItem('userId')
        const authTimeout =
          (expirationDate.getTime() - new Date().getTime()) / 1000

        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout(authTimeout))
      }
    }
  }
}
