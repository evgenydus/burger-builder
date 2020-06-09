import React, { Component } from 'react'
import axios from '../../../axios-orders'

import './ContactData.css'

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
      },
    },
    isLoading: false,
  }

  orderHandler = (event) => {
    event.preventDefault()

    this.setState({ isLoading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }

    updatedFormElement.value = event.target.value
    updatedOrderForm[inputIdentifier] = updatedFormElement

    this.setState({ orderForm: updatedOrderForm })
  }

  render() {
    const formElementsArray = []

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      })
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType}
            key={formElement.id}
            value={formElement.config.value}
          />
          )
        )}
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
