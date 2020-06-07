import React, { Component } from 'react';

import axios from '../../axios-orders'
import Order from '../../components/Order/Order';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          })
        }

        this.setState({ isLoading: false, orders: fetchedOrders })
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {

    return (
      <div>
        {this.state.orders.map(({ id, ingredients, price }) => (
            <Order
              key={id}
              ingredients={ingredients}
              price={+price}
            />
          )
        )}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
