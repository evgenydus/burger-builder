import React, { Component } from 'react'
import axios from '../../../axios-orders'

import './ContactData.css'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    isLoading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Evgeny',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Belarus',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }

    axios.post('/orders.json', order)
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/')
      })
      .catch(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    let form = (
      <form>
      <input className="contact" type="text" name="name" placeholder="Your Name"/>
      <input className="contact" type="email" name="email" placeholder="Your Email"/>
      <input className="contact" type="text" name="street" placeholder="Street"/>
      <input className="contact" type="text" name="postal" placeholder="Postal Code"/>
      <Button btnType={['success']} clicked={this.orderHandler}>Order</Button>
    </form>
    )

    if (this.state.isLoading) {
      form = <Spinner />
    }

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
