import React, { Component } from 'react'

import './ContactData.css'

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render() {

    return (
      <div className="contact-data">
        <h4>Enter your Contact Data</h4>
        <form>
          <input className="contact" type="text" name="name" placeholder="Your Name"/>
          <input className="contact" type="email" name="email" placeholder="Your Email"/>
          <input className="contact" type="text" name="street" placeholder="Street"/>
          <input className="contact" type="text" name="postal" placeholder="Postal Code"/>
          <Button btnType={['success']}>Order</Button>
        </form>
      </div>
    )
  }
}

export default ContactData
