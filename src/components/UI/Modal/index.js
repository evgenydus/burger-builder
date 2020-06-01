import React from 'react'

import './styles.css'

import Backdrop from '../Backdrop';

const Modal = ({ children, modalClosed, show }) => (
  <>
    <Backdrop clicked={modalClosed} show={show}/>
    <div className={`modal ${show && 'show'}`}>
      {children}
    </div>
  </>
)

export default Modal
