import React from 'react'

import './Backdrop.css'

const Backdrop = ({ clicked, isVisible }) => (
  isVisible ? <div className="backdrop" onClick={clicked} /> : null
  )

export default Backdrop
