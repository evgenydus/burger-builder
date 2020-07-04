import React from 'react'

import './OrderSummary.css'

import Button from '../../UI/Button/Button'

const OrderSummary = ({
  ingredients,
  price,
  purchaseCancelled,
  purchaseContinue,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((ingredientKey) => {
    return (
      <li key={ingredientKey}>
        <span className="ingredient-item">{ingredientKey}</span>:{' '}
        {ingredients[ingredientKey]}
      </li>
    )
  })

  const currentPrice = price.toFixed(2)

  return (
    <>
      <h3 className="order-summary-title">Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <strong>Total price: ${currentPrice}</strong>
      <p>Continue to Checkout</p>
      <div className="button-container">
        <Button btnType={['danger']} clicked={purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType={['success']} clicked={purchaseContinue}>
          Continue
        </Button>
      </div>
    </>
  )
}

export default OrderSummary
