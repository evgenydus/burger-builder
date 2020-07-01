import React, { useState } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import './ContactData.css'

import * as actions from '../../../store/actions/index';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';
import { checkValidity, updateObject } from '../../../shared/utility';
import { initialOrderForm } from './initialState'

const ContactData = ({
  ings,
  isLoading,
  onOrderBurger,
  onResetBurger,
  price,
  token,
  userId,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [orderForm, setOrderForm] = useState(initialOrderForm);

  const orderHandler = (event) => {
    event.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }

    const order = {
      ingredients: ings,
      price,
      orderData: formData,
      userId,
    }

    onOrderBurger(order, token)
    onResetBurger()
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

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
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
      )}
      <Button
        btnType={['success']}
        clicked={orderHandler}
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
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    onResetBurger: () => dispatch(actions.resetBurger()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
