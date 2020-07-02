import React from 'react'

import './SideDrawer.css'

import Backdrop from '../../UI/Backdrop/Backdrop'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const SideDrawer = ({ closed, isAuth, open }) => {
  const classList = `side-drawer ${open ? 'open' : 'close'}`

  return (
    <>
      <Backdrop clicked={closed} isVisible={open} />
      <div className={classList} onClick={closed}>
        <Logo />
        <nav>
          <NavigationItems isAuth={isAuth} />
        </nav>
      </div>
    </>
  )
}

export default SideDrawer
