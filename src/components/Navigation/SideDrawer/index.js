import React from 'react'

import './styles.css'

import Backdrop from '../../UI/Backdrop';
import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';

const SideDrawer = ({ closed, open }) => {
  const classList = `side-drawer ${open ? 'open' : 'close'}`

  return (
    <>
      <Backdrop clicked={closed} show={open}/>
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
