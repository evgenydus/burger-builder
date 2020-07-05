import React from 'react'

import './Order.css'

import Card from '../UI/Card/Card';

const Order = ({ date, ingredients, number, price }) => {
  const fixedPrice = price.toFixed(2)

  const ingredientsList = []
  for (let ingredientName in ingredients) {
    ingredientsList.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    })
  }

  const ingredientsRender = ingredientsList.map(({ amount, name }) => {
    return (
      <span key={name} className="order-item">
        {name} - {amount}
      </span>
    )
  })

  return (
    <Card cardStyle="order">
      <div className="date-container">
        <h2 className="order-date">{date}</h2>
        <p className="order-number">№: {number}</p>
      </div>
      <div className="order-ingredients">
        <h3 className="ingredients-title">Ingredients:</h3>
        {ingredientsRender}
      </div>
      <p className="order-price">{`$${fixedPrice}`}</p>
    </Card>
  )
}

export default Order
