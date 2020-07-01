import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import OrderConfirmed from './OrderConfirmed/OrderConfirmed';

const Checkout = ({ history, ings, isPurchased, match }) => {
  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to="/done" />

  if (ings) {
    const purchasedRedirect = isPurchased && <Redirect to="/done" />
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ings}
        />
        <Route
          path={`${match.path}/contact-data`}
          component={ContactData}
        />
        <Route path={`/done`} render={<OrderConfirmed ingredients={ings} />} />
      </div>
    )
  }

  return summary
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    isPurchased: state.order.isPurchased,
  }
}

export default connect(mapStateToProps)(Checkout)
