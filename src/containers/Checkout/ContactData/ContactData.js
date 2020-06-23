import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'
import * as orderActions from '../../../store/actions/index';

import './ContactData.css'

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';
import { checkValidity, updateObject } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        isTouched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        isTouched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          isRequired: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        isValid: false,
        isTouched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          isRequired: true,
        },
        isValid: false,
        isTouched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          isRequired: true,
          isEmail: true,
        },
        isValid: false,
        isTouched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: 'fastest',
        validation: {},
        isValid: true,
      },
    },
    isFormValid: false,
  }

  orderHandler = (event) => {
    const { ings, onOrderBurger, price, token, userId } = this.props
    event.preventDefault()

    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId,
    }

    onOrderBurger(order, token)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      isValid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      isTouched: true,
    })

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    let isFormValid = true
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].isValid && isFormValid
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid })
  }

  render() {
    const { isFormValid, orderForm } = this.state
    const { isLoading } = this.props
    const formElementsArray = []

    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType}
            invalid={!formElement.config.isValid}
            isTouched={formElement.config.isTouched}
            key={formElement.id}
            shouldValidate={formElement.config.validation}
            value={formElement.config.value}
          />
          )
        )}
      <Button
        btnType={['success']}
        clicked={this.orderHandler}
        disabled={!isFormValid}
      >
        Order
      </Button>
    </form>
    )

    if (isLoading) {
      form = <Spinner />
    }

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
