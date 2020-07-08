import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Auth.css'

import * as actions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'
import Card from '../../components/UI/Card/Card'
import Input from '../../components/UI/Input/Input'
import Loader from '../../components/UI/Loader/Loader'
import { checkValidity, updateObject } from '../../shared/utility'
import { initialAuthForm } from './initialState'

const Auth = ({
  authRedirectPath,
  error,
  isAuthenticated,
  isBuildingBurger,
  isLoading,
  onAuth,
  onSetAuthRedirectPath,
}) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [authForm, setAuthForm] = useState(initialAuthForm.login)

  useEffect(() => {
    if (!isBuildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
    isSignUp ? setAuthForm(initialAuthForm.signUp) : setAuthForm(initialAuthForm.login)
  }, [authRedirectPath, onSetAuthRedirectPath, isBuildingBurger, isSignUp])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, authForm[controlName].validation),
        isTouched: true,
      }),
    })

    setAuthForm(updatedControls)
  }

  const submitHandler = (event) => {
    const { email, password } = authForm
    event.preventDefault()
    onAuth(email.value, password.value, isSignUp)
  }

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp)
  }

  const formElementsArray = []

  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    })
  }

  let form = formElementsArray.map((formElement) => {
    return (
      <Input
        changed={(event) => inputChangedHandler(event, formElement.id)}
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType}
        invalid={!formElement.config.isValid}
        isTouched={formElement.config.isTouched}
        key={formElement.id}
        shouldValidate={formElement.config.validation}
        value={formElement.config.value}
      />
    )
  })

  if (isLoading) {
    form = <Loader />
  }

  return (
    <Card cardStyle="auth">
      {isAuthenticated && <Redirect to={authRedirectPath} />}
      {error && <p>{error.message}</p>}
      <form onSubmit={submitHandler}>
        {form}
        <Button type="submit" btnType={['success']}>
          Submit
        </Button>
      </form>
      <Button btnType={['danger']} clicked={switchAuthModeHandler}>
        Switch to {isSignUp ? 'sign in' : 'sign up'}
      </Button>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
