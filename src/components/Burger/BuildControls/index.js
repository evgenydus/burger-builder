import React from 'react';

import './styles.css'

import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = ({ disabled, ingredientAdded, ingredientRemoved, price }) => {
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
    </div>
  )
}

export default BuildControls
