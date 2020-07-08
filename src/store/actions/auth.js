import axios from '../../axios-orders'

import * as actionTypes from './actionTypes'
import { firebaseApiKey, authEndpoints } from '../../appData/appData'
import { resetBurger } from './burgerBuilder'
import { toggleOrdersFetching } from './order'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (idToken, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
    email,
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
  localStorage.removeItem('email')

  return { type: actionTypes.AUTH_LOGOUT }
}

export const closeSession = () => {
  return (dispatch) => {
    dispatch(toggleOrdersFetching())
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

    const { signUp, login } = authEndpoints
    const endpoint = isSignUp ? signUp : login

    const userData = { email }
    axios
      .post(`${endpoint}?key=${firebaseApiKey}`, authData)
      .then((response) => {
        const { idToken, localId, expiresIn } = response.data
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)

        localStorage.setItem('token', idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', localId)
        localStorage.setItem('email', email)

        dispatch(authSuccess(idToken, localId, email))
        dispatch(checkAuthTimeout(expiresIn))

        if (isSignUp) {
          axios.post(`/users.json?auth=${idToken}`, userData).then(() => {
            dispatch(registerUserEmail(email))
            dispatch(getUserData(idToken, email))
          })
        } else {
          dispatch(getUserData(idToken, email))
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const postUserData = (userData) => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const queryParams = `?auth=${token}&orderBy="email"&equalTo="${email}"`

    axios.get(`/users.json${queryParams}`).then((response) => {
      const userId = Object.keys(response.data).join('')

      axios.patch(`/users/${userId}.json?auth=${token}`, { ...userData }).then(() => {
        dispatch(postUserDataSuccess(userData))
      })
    })
  }
}

export const postUserDataSuccess = (userData) => {
  return {
    type: actionTypes.POST_USER_DATA_SUCCESS,
    userData,
  }
}

export const getUserData = (idToken, email) => {
  return (dispatch) => {
    const queryParams = `?auth=${idToken}&orderBy="email"&equalTo="${email}"`
    axios.get(`/users.json${queryParams}`).then((response) => {
      let userData = {}
      for (let key in response.data) {
        userData = { ...response.data[key] }
      }
      dispatch(setUserData(userData))
    })
  }
}

export const setUserData = (userData) => {
  return {
    type: actionTypes.SET_USER_DATA,
    userData,
  }
}

export const registerUserEmail = (email) => {
  return {
    type: actionTypes.REGISTER_USER_EMAIL,
    email,
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
        const email = localStorage.getItem('email')
        const authTimeout = (expirationDate.getTime() - new Date().getTime()) / 1000

        dispatch(authSuccess(token, userId, email))
        dispatch(checkAuthTimeout(authTimeout))
      }
    }
  }
}
