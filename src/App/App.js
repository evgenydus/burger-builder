import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import Layout from '../components/hoc/Layout/Layout';

const App = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
