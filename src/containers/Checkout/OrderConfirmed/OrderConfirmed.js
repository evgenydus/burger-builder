import React from 'react'

import './OrderConfirmed.css'

import Card from '../../../components/UI/Card/Card';
import Burger from '../../../components/Burger/Burger';

const OrderConfirmed = ({ ingredients }) => {

  return (
    <div className="order-confirmed">
      <Burger ingredients={ingredients} />
      <Card>
        <h2 className="done-title">Thank you!</h2>
        <p className="done-text">You will get your burger soon</p>
      </Card>
    </div>
  )
}

export default OrderConfirmed
