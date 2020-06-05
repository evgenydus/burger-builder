import React from 'react';

import './App.css';

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Layout from '../components/hoc/Layout/Layout';

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
