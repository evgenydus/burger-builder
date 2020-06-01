import React from 'react'

import './styles.css'

const Modal = ({ children, show }) => {

  return (
    <div className={`modal ${show && 'show'}`}>
      {children}
    </div>
  )
}

export default Modal
