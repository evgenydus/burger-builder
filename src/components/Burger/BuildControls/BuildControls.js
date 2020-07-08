import React from 'react'

import './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'
import Card from '../../UI/Card/Card'

const controls = [
  { label: 'Salad', type: 'salad', quantity: 0 },
  { label: 'Bacon', type: 'bacon', quantity: 0 },
  { label: 'Cheese', type: 'cheese', quantity: 0 },
  { label: 'Meat', type: 'meat', quantity: 0 },
]

const BuildControls = ({
  clear,
  ingredientAdded,
  ingredientRemoved,
  ings,
  isAuth,
  isPurchasable,
  price,
  purchase,
}) => {
  const currentPrice = price.toFixed(2)

  const orderBtnText = isAuth ? 'Order now!' : `Sign up to order`

  controls.forEach((ing) => {
    ing.quantity = ings[ing.type]
  })

  const disabledInfo = {
    less: { ...ings },
    more: { ...ings },
  }

  for (let key in disabledInfo.less) {
    disabledInfo.less[key] = disabledInfo.less[key] <= 0
  }

  for (let key in disabledInfo.more) {
    disabledInfo.more[key] = disabledInfo.more[key] >= 3
  }

  return (
    <Card cardStyle="build-controls">
      {controls.map(({ label, type, quantity }) => (
        <BuildControl
          added={() => ingredientAdded(type)}
          disabledLess={disabledInfo.less[type]}
          disabledMore={disabledInfo.more[type]}
          key={label}
          label={label}
          removed={() => ingredientRemoved(type)}
          quantity={quantity}
        />
      ))}
      <p className="price">
        Current price: <strong>${currentPrice}</strong>
      </p>
      <div className="checkout">
        <button className="checkout-button clear-btn" disabled={isPurchasable} onClick={clear}>
          Clear all
        </button>
        <button className="checkout-button order-btn" disabled={isPurchasable} onClick={purchase}>
          {orderBtnText}
        </button>
      </div>
    </Card>
  )
}

export default BuildControls
