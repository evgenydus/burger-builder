import React from 'react';

import './styles.css'

const BuildControl = ({ added, disabled, label, removed }) => {

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
