import React from 'react'
import { connect } from 'react-redux'

import './OrderComplete.css'

import * as actions from '../../../store/actions';
import Button from '../../../components/UI/Button/Button';
import Card from '../../../components/UI/Card/Card';

const OrderComplete = ({ history, onResetBurger }) => {

  const goToOrdersHandler = () => {
    history.replace('/orders')
    onResetBurger()
  }

  const orderMoreHandler = () => {
    history.replace('/')
    onResetBurger()
  }

  return (
    <div className="order-complete">
      <Card>
        <h2 className="done-title">Thank you!</h2>
        <p className="done-text">You will get your burger soon</p>
        <Button btnType={['danger']} clicked={goToOrdersHandler}>Orders</Button>
        <Button btnType={['success']} clicked={orderMoreHandler}>Order one more!</Button>
      </Card>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onResetBurger: () => dispatch(actions.resetBurger()),
  }
}

export default connect(null, mapDispatchToProps)(OrderComplete)

