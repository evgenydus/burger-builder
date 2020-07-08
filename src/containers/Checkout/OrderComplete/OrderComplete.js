import React from 'react'
import { connect } from 'react-redux'

import './OrderComplete.css'

import * as actions from '../../../store/actions'
import Button from '../../../components/UI/Button/Button'
import Card from '../../../components/UI/Card/Card'
import Loader from '../../../components/UI/Loader/Loader'

const OrderComplete = ({ history, isLoading, onResetBurger }) => {
  const goToOrdersHandler = () => {
    history.replace('/orders')
    onResetBurger()
  }

  const orderMoreHandler = () => {
    history.replace('/')
    onResetBurger()
  }

  const cardRender = (
    <Card cardStyle="order-complete-card">
      <h2 className="done-title">Thank you!</h2>
      <p className="done-text">You will get your burger soon</p>
      <Button btnType={['danger']} clicked={goToOrdersHandler}>
        Orders
      </Button>
      <Button btnType={['success']} clicked={orderMoreHandler}>
        Order one more!
      </Button>
    </Card>
  )

  return <div className="order-complete">{isLoading ? <Loader /> : cardRender}</div>
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.order.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetBurger: () => dispatch(actions.resetBurger()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderComplete)
