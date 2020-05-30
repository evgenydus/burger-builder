import React from 'react';

import './styles.css'

import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BuildControls = () => {

  return (
    <div className='build-controls'>
      {controls.map(ctrl => <BuildControl key={ctrl.label} label={ctrl.label} />)}
    </div>
  )
}

export default BuildControls
