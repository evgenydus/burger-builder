import React from 'react'

import './SideDrawer.css'

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = ({ closed, open }) => {
  const classList = `side-drawer ${open ? 'open' : 'close'}`

  return (
    <>
      <Backdrop clicked={closed} isVisible={open}/>
      <div className={classList}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  )
}

export default SideDrawer
