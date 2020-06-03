import React from 'react'

import './styles.css'

const Backdrop = ({ clicked, show }) => (
  show ? <div className="backdrop" onClick={clicked} /> : null
  )

export default Backdrop
