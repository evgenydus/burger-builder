import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Layout.css'

import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Navigation/Toolbar/Toolbar';

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
    const { children, isAuthenticated } = this.props
    const { showSideDrawer } = this.state

    return (
      <>
        <Toolbar
          drawerToggleClicked={this.showSideDrawerToggleHandler}
          isAuth={isAuthenticated}
        />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          isAuth={isAuthenticated}
          open={showSideDrawer}
        />
        <main className="content">
          {children}
        </main>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout)
