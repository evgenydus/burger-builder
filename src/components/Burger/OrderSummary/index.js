import React from 'react';

import './styles.css'

const OrderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.keys(ingredients).map(ingredientKey => {
    return (
      <li key={ingredientKey}>
        <span className="capitalized">{ingredientKey}</span>: {ingredients[ingredientKey]}
      </li>
    )
  })

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout</p>
    </>
  )
}

export default OrderSummary
