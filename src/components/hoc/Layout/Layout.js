import React, { useState } from 'react'
import { connect } from 'react-redux'

import './Layout.css'

import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Navigation/Toolbar/Toolbar';

const Layout = ({ children, isAuthenticated }) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }

  const showSideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }

  return (
    <>
      <Toolbar
        drawerToggleClicked={showSideDrawerToggleHandler}
        isAuth={isAuthenticated}
      />
      {/*<SideDrawer*/}
      {/*  closed={sideDrawerClosedHandler}*/}
      {/*  isAuth={isAuthenticated}*/}
      {/*  open={sideDrawerIsVisible}*/}
      {/*/>*/}
      <main className="content">
        {/*{children}*/}
        <div className="under-construction"> Sorry, the page is under construction</div>
      </main>
    </>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
