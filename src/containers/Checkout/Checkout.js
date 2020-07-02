import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import OrderConfirmed from './OrderComplete/OrderComplete'

const Checkout = ({ history, ingredients, match }) => {
  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  if (!ingredients) return <Redirect to="/" />

  return (
    <div>
      <CheckoutSummary
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={ingredients}
      />
      <Route path={`${match.path}/contact-data`} component={ContactData} />
      <Route path={`${match.path}/done`} component={OrderConfirmed} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)
