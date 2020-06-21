import React from 'react'

import './NavigationItems.css'

import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = ({ isAuth }) => (
  <ul className="navigation-items">
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    { !isAuth ?
      <NavigationItem link="/auth">Authenticate</NavigationItem>
      :
      <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </ul>
)

export default NavigationItems
