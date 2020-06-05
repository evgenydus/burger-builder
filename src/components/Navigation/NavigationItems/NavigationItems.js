import React from 'react'

import './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => (
  <ul className="navigation-items">
    <NavigationItem active link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
)

export default NavigationItems
