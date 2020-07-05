import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './Checkout.css'

import Burger from '../../components/Burger/Burger'
import ContactData from './ContactData/ContactData'
import OrderConfirmed from './OrderComplete/OrderComplete'
import PageTitle from '../../components/UI/PageTitle/PageTitle'

const Checkout = ({ ingredients, match, isPurchasing }) => {
  if (!ingredients) return <Redirect to="/" />

  const checkoutTitle = isPurchasing
    ? 'We are sure it tastes well!'
    : 'Order Complete!'

  return (
    <>
      <PageTitle>{checkoutTitle}</PageTitle>
      <div className="checkout-container">
        <Burger ingredients={ingredients} />
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
