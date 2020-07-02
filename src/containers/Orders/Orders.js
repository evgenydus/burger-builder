import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import * as orderActions from '../../store/actions/index'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'

const Orders = ({ isLoading, onFetchOrders, orders, token, userId }) => {
  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders, token, userId])

  const ordersList = orders.map(({ id, ingredients, price }) => (
    <Order key={id} ingredients={ingredients} price={+price} />
  ))

  return <div>{!isLoading ? ordersList : <Spinner />}</div>
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(orderActions.fetchOrders(token, userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
