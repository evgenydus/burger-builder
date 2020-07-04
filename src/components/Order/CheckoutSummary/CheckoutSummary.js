import React from 'react'

import './CheckoutSummary.css'

import Burger from '../../Burger/Burger'

const CheckoutSummary = ({ ingredients }) => {
  return (
    <div className="checkout-summary">
      <div className="checkout-burger">
        <Burger ingredients={ingredients} />
      </div>
    </div>
  )
}

export default CheckoutSummary
