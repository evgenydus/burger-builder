import React, { useEffect, Suspense } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import './App.css'

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder'
import Layout from '../components/hoc/Layout/Layout'
import Loader from '../components/UI/Loader/Loader'
import Logout from '../containers/Auth/Logout/Logout'

const Checkout = React.lazy(() => {
  return import('../containers/Checkout/Checkout')
})

const Orders = React.lazy(() => {
  return import('../containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('../containers/Auth/Auth')
})

const App = (props) => {
  const { onTryAutoSignUp, isAuthenticated } = props

  useEffect(() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp])

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Loader />}>{routes}</Suspense>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
