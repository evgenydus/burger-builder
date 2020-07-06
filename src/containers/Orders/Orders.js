import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './Orders.css'

import * as orderActions from '../../store/actions/index'
import axios from '../../axios-orders'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import Order from '../../components/Order/Order'
import PageTitle from '../../components/UI/PageTitle/PageTitle'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'

const noOrdersText = 'You have no orders yet'

const Orders = ({
  history,
  isLoaded,
  isLoading,
  onFetchOrders,
  orders,
  token,
  userId,
}) => {
  useEffect(() => {
    !isLoaded && onFetchOrders(token, userId)
  }, [isLoaded, onFetchOrders, token, userId])

  const ordersList = orders.map(
    ({ id, ingredients, orderDate, orderNumber, price }) => {
      return (
        <Order
          date={orderDate}
          ingredients={ingredients}
          key={id}
          number={orderNumber}
          price={+price}
        />
      )
    }
  )

  const orderNowHandler = () => {
    history.replace('/')
  }

  const ordersRender =
    orders.length > 0 ? (
      ordersList
    ) : (
      <>
        <PageTitle>{noOrdersText}</PageTitle>
        <Button btnType={['success']} clicked={orderNowHandler}>
          Order now!
        </Button>
      </>
    )

  return (
    <div className="orders-container">
      {isLoaded && !isLoading ? ordersRender : <Loader />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId,
    isLoaded: state.order.isLoaded,
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
