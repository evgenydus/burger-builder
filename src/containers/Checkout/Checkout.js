import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import OrderConfirmed from './OrderComplete/OrderComplete';
import Spinner from '../../components/UI/Spinner/Spinner';

const Checkout = ({ history, ings, isPurchased, isLoading, match }) => {
  const checkoutCancelledHandler = () => {
    history.goBack()
  }

  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to="/" />

  if (ings) {
    summary = (
      <div>
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={ings}
        />
        {isPurchased ?
          <Route path={`${match.path}/done`} component={OrderConfirmed} />
          : isLoading &&
          <Spinner />
        }
        <Route
          path={`${match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    )
  }

  return summary
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    isPurchased: state.order.isPurchased,
    isLoading: state.order.isLoading,
  }
}

export default connect(mapStateToProps)(Checkout)
