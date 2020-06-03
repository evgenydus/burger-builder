import React from 'react'

import './styles.css'

import burgerLogo from '../../assets/logo.png'

const Logo = () => (
  <div className="logo">
    <a href="#">
      <img src={burgerLogo} alt="logo"/>
    </a>
  </div>
)

export default Logo
