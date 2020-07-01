import React from 'react';

import './BuildControl.css'

const BuildControl = ({ added, disabledLess, disabledMore, label, removed, quantity }) => {

  return (
    <div className="build-control">
      <div className="label">{label}</div>
      <button
        className="control-btn less"
        disabled={disabledLess}
        onClick={removed}
      >
        Less
      </button>
      <span className="quantity">{`x${quantity}`}</span>
      <button
        className="control-btn more"
        disabled={disabledMore}
        onClick={added}
      >
        More
      </button>
    </div>
  )
}

export default BuildControl
