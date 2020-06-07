import React from 'react';

import './CheckoutSummary.css'

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = ({ ingredients }) => {

  return (
    <div className="checkout-summary">
      <h1>We hope it tastes well!</h1>
      <div className="checkout-burger">
        <Burger ingredients={ingredients}/>
      </div>
      <Button btnType={['danger']} clicked>Cancel</Button>
      <Button btnType={['success']} clicked>Continue</Button>
    </div>
  )
}

export default CheckoutSummary
