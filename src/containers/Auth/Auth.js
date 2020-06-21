import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Auth.css'

import * as actions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          isRequired: true,
          isEmail: true,
        },
        isValid: false,
        isTouched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 6,
        },
        isValid: false,
        isTouched: false,
      },
    },
    isSignUp: true,
  }

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath()
    }
  }

  checkValidity(value, rules) {
    let isValid = true

    if (rules.isRequired) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid
  }

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        isValid: this.checkValidity(event.target.value, controls[controlName].validation),
        isTouched: true,
      },
    }

    this.setState({ controls: updatedControls})
  }

  submitHandler = (event) => {
    const { email, password } = this.state.controls

    event.preventDefault()

    this.props.onAuth(email.value, password.value, this.state.isSignUp )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  render () {
    const { authRedirectPath, isLoading, error, isAuthenticated } = this.props
    const { controls, isSignUp } = this.state
    const formElementsArray = []

    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      })
    }

    let form = formElementsArray.map(formElement => {
      return (<Input
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType}
        invalid={!formElement.config.isValid}
        isTouched={formElement.config.isTouched}
        key={formElement.id}
        shouldValidate={formElement.config.validation}
        value={formElement.config.value}
        />)
    })

    if (isLoading) {
      form = <Spinner />
    }

    const errorMessage = error ? <p>{error.message}</p> : null
    const authRedirect = isAuthenticated ? <Redirect to={authRedirectPath} /> : null

    return (
      <div className="auth">
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType={['success']}>Submit</Button>
        </form>
        <Button
          btnType={['danger']}
          clicked={this.switchAuthModeHandler}
        >
          Switch to {isSignUp ? 'sign in' : 'sign up'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
