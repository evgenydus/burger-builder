import React from 'react';

import './styles.css'

import BuildControl from './BuildControl';

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
  isPurchasable,
  price,
  purchase,
}) => {
  const currentPrice = price.toFixed(2)

  return (
    <div className='build-controls'>
      <p>Current price:
        <b> ${currentPrice}</b>
      </p>
      {controls.map(({ label, type }) => (
        <BuildControl
          added={() => ingredientAdded(type)}
          disabled={disabled[type]}
          key={label}
          label={label}
          removed={() => ingredientRemoved(type)}
        />
        ))}
        <div className="checkout">
          <button
            className="checkout-button clear"
            disabled={isPurchasable}
            onClick={clear}
          >
            Clear all
          </button>
          <button
            className="checkout-button order"
            disabled={isPurchasable}
            onClick={purchase}
          >
            Order now!
          </button>
        </div>
    </div>
  )
}

export default BuildControls
