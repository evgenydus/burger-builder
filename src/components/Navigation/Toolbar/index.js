import React from 'react'

import './styles.css'

import DrawerToggle from '../SideDrawer/DrawerToggle'
import Logo from '../../Logo'
import NavigationItems from '../NavigationItems'

const Toolbar = ({ drawerToggleClicked }) => (
  <header className="toolbar">
    <DrawerToggle clicked={drawerToggleClicked} />
    <Logo />
    <nav className="nav desktop-only">
      <NavigationItems />
    </nav>
  </header>
)

export default Toolbar
