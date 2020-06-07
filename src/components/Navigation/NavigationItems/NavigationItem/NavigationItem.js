import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavigationItem.css'

const NavigationItem = ({ children, exact, link }) => (
  <li className="navigation-item">
    <NavLink
      activeClassName="active"
      exact={exact}
      to={link}
    >
      {children}
    </NavLink>
  </li>
)

export default NavigationItem
