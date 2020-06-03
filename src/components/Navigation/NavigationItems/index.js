import React from 'react'

import './styles.css'

import NavigationItem from './NavigationItem'

const NavigationItems = () => (
  <ul className="navigation-items">
    <NavigationItem active link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
)

export default NavigationItems
