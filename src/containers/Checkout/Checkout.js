import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './Checkout.css'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import OrderConfirmed from './OrderComplete/OrderComplete'

const Checkout = ({ ingredients, match, isPurchasing }) => {
  if (!ingredients) return <Redirect to="/" />

  const checkoutTitle = isPurchasing
    ? 'We are sure it tastes well!'
    : 'Order Complete!'

  return (
    <>
      <h2 className="checkout-title">{checkoutTitle}</h2>
      <div className="checkout-container">
        <CheckoutSummary ingredients={ingredients} />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
        <Route path={`${match.path}/done`} component={OrderConfirmed} />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isPurchasing: state.order.isPurchasing,
  }
}

export default connect(mapStateToProps)(Checkout)
