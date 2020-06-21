import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as orderActions from '../../store/actions/index'
import axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token)
  }

  render() {
    const { orders, isLoading } = this.props
    let ordersRender = <Spinner />

    if (!isLoading) {
      ordersRender = orders.map(({ id, ingredients, price }) => (
          <Order
            key={id}
            ingredients={ingredients}
            price={+price}
          />
        )
      )
    }

    return (
      <div>
        {ordersRender}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isLoading,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(orderActions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
