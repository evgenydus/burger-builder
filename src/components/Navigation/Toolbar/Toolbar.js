import React from 'react'

import './Toolbar.css'

// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Logo/Logo'
// import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className="toolbar">
    {/*<DrawerToggle clicked={drawerToggleClicked} />*/}
    <Logo />
    {/*<nav className="nav desktop-only">*/}
    {/*  <NavigationItems isAuth={isAuth} />*/}
    {/*</nav>*/}
  </header>
)

export default Toolbar
