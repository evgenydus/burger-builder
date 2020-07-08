import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
  authRedirectPath: '/',
  userData: null,
}

const authStart = (state) => {
  return updateObject(state, { error: null, isLoading: true })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    userData: { email: action.email },
    error: null,
    isLoading: false,
  })
}

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, isLoading: false })
}

const authLogout = (state) => {
  return updateObject(state, { ...initialState })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path })
}

const registerUserEmail = (state, action) => {
  return updateObject(state, { userData: { email: action.email } })
}

const setUserData = (state, action) => {
  return updateObject(state, { userData: { ...action.userData } })
}

const postUserData = (state, action) => {
  return updateObject(state, { userData: { ...action.userData, ...state.userData } })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state)

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)

    case actionTypes.AUTH_FAIL:
      return authFail(state, action)

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state)

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)

    case actionTypes.REGISTER_USER_EMAIL:
      return registerUserEmail(state, action)

    case actionTypes.SET_USER_DATA:
      return setUserData(state, action)

    case actionTypes.POST_USER_DATA_SUCCESS:
      return postUserData(state, action)

    default:
      return state
  }
}

export default reducer
