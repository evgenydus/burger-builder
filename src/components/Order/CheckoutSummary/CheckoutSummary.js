import React from 'react'

import './CheckoutSummary.css'

import Burger from '../../Burger/Burger'

const CheckoutSummary = ({ ingredients }) => {
  return (
    <div className="checkout-summary">
      <h2 className="checkout-title">We hope it tastes well!</h2>
      <div className="checkout-burger">
        <Burger ingredients={ingredients} />
      </div>
    </div>
  )
}

export default CheckoutSummary
