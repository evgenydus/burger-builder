import React, { useState } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'
import moment from 'moment'

import './ContactData.css'

import * as actions from '../../../store/actions/index'
import Button from '../../../components/UI/Button/Button'
import Card from '../../../components/UI/Card/Card'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler'
import { checkValidity, updateObject } from '../../../shared/utility'
import { initialOrderForm } from './initialState'

const ContactData = ({
  history,
  ingredients,
  isLoading,
  onOrderBurger,
  price,
  token,
  userId,
}) => {
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
    history.replace('/checkout/done')
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      isValid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
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

  let contactForm = (
    <div>
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
      <Button
        btnType={['success']}
        clicked={orderHandler}
        disabled={!isFormValid}
      >
        Order
      </Button>
    </div>
  )

  if (isLoading) {
    contactForm = <Spinner />
  }

  return (
    <div className="contact-data">
      <Card cardStyle="contact-form-card">
        <h3>Enter your Contact Data</h3>
        {contactForm}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios))
