import React from 'react'
import { connect } from 'react-redux'

import './CheckoutSummary.css'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const CheckoutSummary = ({
  checkoutCancelled,
  checkoutContinued,
  ingredients,
  isLoading,
  isPurchasing,
}) => {
  return (
    <div className="checkout-summary">
      <h2 className="checkout-title">We hope it tastes well!</h2>
      <div className="checkout-burger">
        <Burger ingredients={ingredients} />
      </div>
      {isPurchasing && !isLoading && (
        <>
          <Button btnType={['danger']} clicked={checkoutCancelled}>
            Cancel
          </Button>
          <Button btnType={['success']} clicked={checkoutContinued}>
            Continue
          </Button>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isPurchasing: state.order.isPurchasing,
    isLoading: state.order.isLoading,
  }
}

export default connect(mapStateToProps)(CheckoutSummary)
