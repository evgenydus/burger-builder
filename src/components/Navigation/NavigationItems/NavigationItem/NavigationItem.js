import React from 'react'

import './NavigationItem.css'

const NavigationItem = ({ active, children, link }) => (
  <li className="navigation-item">
    <a href={link} className={`link ${active && 'active'}`}>{children}</a>
  </li>
)

export default NavigationItem
