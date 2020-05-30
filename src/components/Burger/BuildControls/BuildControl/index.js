import React from 'react';

import './styles.css'

const BuildControl = ({ label }) => {

  return (
    <div className="build-control">
      <div className="label">{label}</div>
      <button className="control-btn less">Less</button>
      <button className="control-btn more">More</button>
    </div>
  )
}

export default BuildControl
