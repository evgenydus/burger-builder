import React from 'react'

import './Order.css'

const Order = ({ ingredients, price }) => {
  const fixedPrice = price.toFixed(2)

  const ingredientsList = []
  for (let ingredientName in ingredients) {
    ingredientsList.push({
      name: ingredientName,
      amount: ingredients[ingredientName]
    })
  }

  const ingredientOutput = ingredientsList.map(({ amount, name }) => {
    return <span
      key={name}
      className='order-item'
    >
      {name} ({amount})
    </span>
  })

  return (
    <div className="order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>{`USD ${fixedPrice}`}</strong></p>
    </div>)
}

export default Order
