import React from 'react';

import './App.css';

import BurgerBuilder from '../containers/BurgerBuilder';
import Layout from '../components/Layout';

const App = () => {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
