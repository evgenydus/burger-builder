import React from 'react';

import './OrderSummary.css'

import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, price, purchaseCancelled, purchaseContinue }) => {
  const ingredientSummary = Object.keys(ingredients).map(ingredientKey => {
    return (
      <li key={ingredientKey}>
        <span className="capitalized">{ingredientKey}</span>: {ingredients[ingredientKey]}
      </li>
    )
  })

  const currentPrice = price.toFixed(2)

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p className="strong">Total price: {currentPrice}</p>
      <p>Continue to Checkout</p>
      <Button btnType={['danger']} clicked={purchaseCancelled}>CANCEL</Button>
      <Button btnType={['success']} clicked={purchaseContinue}>CONTINUE</Button>
    </>
  )
}

export default OrderSummary
