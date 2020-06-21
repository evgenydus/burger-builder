import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import './App.css';

import Auth from '../containers/Auth/Auth';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import Layout from '../components/hoc/Layout/Layout';
import Logout from '../containers/Auth/Logout/Logout';
import Orders from '../containers/Orders/Orders';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
