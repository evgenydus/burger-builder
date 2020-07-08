import React, { useState } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'
import moment from 'moment'

import './ContactData.css'

import * as actions from '../../../store/actions/index'
import Button from '../../../components/UI/Button/Button'
import Card from '../../../components/UI/Card/Card'
import Input from '../../../components/UI/Input/Input'
import Loader from '../../../components/UI/Loader/Loader'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler'
import { checkValidity, updateObject } from '../../../shared/utility'

const ContactData = ({
  history,
  ingredients,
  isLoading,
  onOrderBurger,
  onPostUserData,
  price,
  token,
  userData,
  userId,
}) => {
  const initialOrderForm = {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: userData.name || '',
      validation: {
        isRequired: true,
      },
      isValid: true,
      isTouched: false,
    },
    phone: {
      elementType: 'input',
      elementConfig: {
        type: 'tel',
        placeholder: 'Phone',
      },
      value: userData.phone || '',
      validation: {
        isRequired: true,
        isPhone: true,
      },
      isValid: true,
      isTouched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
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
        placeholder: 'ZIP Code',
      },
      value: '',
      validation: {
        isRequired: true,
        minLength: 5,
        maxLength: 6,
        isNumeric: true,
      },
      isValid: false,
      isTouched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
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
        placeholder: 'Your E-Mail',
      },
      value: userData.email || '',
      validation: {
        isRequired: true,
        isEmail: true,
      },
      isValid: true,
      isTouched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      isValid: true,
    },
  }

  const [isFormValid, setIsFormValid] = useState(false)
  const [orderForm, setOrderForm] = useState(initialOrderForm)

  const cancelHandler = () => {
    history.goBack()
  }

  const orderHandler = (event) => {
    event.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const orderNumber = String(Date.now()).slice(-6)
    const orderDate = moment().format('D MMMM')

    const order = {
      ingredients,
      price,
      orderData: formData,
      userId,
      orderNumber,
      orderDate,
    }

    onOrderBurger(order, token)

    const { name, phone } = orderForm
    onPostUserData({ name: name.value, phone: phone.value })
    history.replace('/checkout/done')
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      isValid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      isTouched: true,
    })

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    let isFormValid = true
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].isValid && isFormValid
    }

    setOrderForm(updatedOrderForm)
    setIsFormValid(isFormValid)
  }

  const formElementsArray = []

  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    })
  }

  const contactForm = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
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
      ))}
      <Button btnType={['danger']} clicked={cancelHandler}>
        Cancel
      </Button>
      <Button btnType={['success']} type="submit" disabled={!isFormValid}>
        Order
      </Button>
    </form>
  )

  return (
    <div className="contact-data">
      <Card cardStyle="contact-form-card">
        <h3>Enter your Contact Data</h3>
        {isLoading ? <Loader /> : contactForm}
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
    userData: state.auth.userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    onPostUserData: (userData) => dispatch(actions.postUserData(userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
