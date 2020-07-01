import React from 'react';

import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad', quantity: 0 },
  { label: 'Bacon', type: 'bacon', quantity: 0 },
  { label: 'Cheese', type: 'cheese', quantity: 0 },
  { label: 'Meat', type: 'meat', quantity: 0 },
]

const BuildControls = ({
  clear,
  disabled,
  ingredientAdded,
  ingredientRemoved,
  ingredients,
  isAuth,
  isPurchasable,
  price,
  purchase,
}) => {
  const currentPrice = price.toFixed(2)

  const orderBtnText = isAuth ? 'Order now!' : `Sign up to order`

  controls.forEach(ing => {
    ing.quantity = ingredients[ing.type]
  })

  return (
    <div className='build-controls'>
      {controls.map(({ label, type, quantity }) => (
        <BuildControl
          added={() => ingredientAdded(type)}
          disabled={disabled[type]}
          key={label}
          label={label}
          removed={() => ingredientRemoved(type)}
          quantity={quantity}
        />
      ))}
      <p className="price">Current price:{' '}
        <strong>${currentPrice}</strong>
      </p>
      <div className="checkout">
        <button
          className="checkout-button clear-btn"
          disabled={isPurchasable}
          onClick={clear}
        >
          Clear all
        </button>
        <button
          className="checkout-button order-btn"
          disabled={isPurchasable}
          onClick={purchase}
        >
          {orderBtnText}
        </button>
      </div>
    </div>
  )
}

export default BuildControls
