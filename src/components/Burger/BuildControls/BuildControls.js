import React from 'react';

import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = ({
  clear,
  disabled,
  ingredientAdded,
  ingredientRemoved,
  isAuth,
  isPurchasable,
  price,
  purchase,
}) => {
  const currentPrice = price.toFixed(2)

  const orderBtnText = isAuth ? 'Order now!' : `Sign up to order`

  return (
    <div className='build-controls'>
      {controls.map(({ label, type }) => (
        <BuildControl
          added={() => ingredientAdded(type)}
          disabled={disabled[type]}
          key={label}
          label={label}
          removed={() => ingredientRemoved(type)}
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
