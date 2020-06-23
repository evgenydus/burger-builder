import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './Auth.css'

import * as actions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity, updateObject } from '../../shared/utility';

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

  inputChangedHandler = (event, controlName) => {
    const { controls } = this.state
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        isValid: checkValidity(event.target.value, controls[controlName].validation),
        isTouched: true,
      })
    })

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

    return (
      <div className="auth">
        {isAuthenticated && <Redirect to={authRedirectPath} />}
        {error && <p>{error.message}</p>}
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
