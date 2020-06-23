import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import './App.css';

import asyncComponent from '../components/hoc/asyncComponent/asyncComponent';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Layout from '../components/hoc/Layout/Layout';
import Logout from '../containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
  return import('../containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('../containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('../containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
