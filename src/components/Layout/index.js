import React, { Component } from 'react'

import './styles.css'

import SideDrawer from '../Navigation/SideDrawer';
import Toolbar from '../Navigation/Toolbar';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  showSideDrawerToggleHandler = () => {
    this.setState((prevState) => (
      { showSideDrawer: !prevState.showSideDrawer }
    ))
  }

  render() {
    const { children } = this.props
    const { showSideDrawer } = this.state

    return (
      <>
        <Toolbar drawerToggleClicked={this.showSideDrawerToggleHandler}/>
        <SideDrawer closed={this.sideDrawerClosedHandler} open={showSideDrawer}/>
        <main className="content">
          {children}
        </main>
      </>
    )
  }
}

export default Layout
