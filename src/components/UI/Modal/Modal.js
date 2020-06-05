import React from 'react'

import './Modal.css'

import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ children, modalClosed, isVisible }) => (
  <>
    <Backdrop clicked={modalClosed} isVisible={isVisible}/>
    <div className={`modal ${isVisible && 'visible'}`}>
      {children}
    </div>
  </>
)

export default Modal
