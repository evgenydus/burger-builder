import React from 'react';

import './BuildControl.css'

const BuildControl = ({ added, disabled, label, removed, quantity }) => {

  return (
    <div className="build-control">
      <div className="label">{label}</div>
      <button
        className="control-btn less"
        disabled={disabled}
        onClick={removed}
      >
        Less
      </button>
      <span className="quantity">{quantity}</span>
      <button
        className="control-btn more"
        onClick={added}
      >
        More
      </button>
    </div>
  )
}

export default BuildControl
