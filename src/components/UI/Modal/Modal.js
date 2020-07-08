import React from 'react'

import './Modal.css'

import Backdrop from '../Backdrop/Backdrop'

const Modal = ({ isVisible, children, modalClosed }) => {
  return (
    <>
      <Backdrop clicked={modalClosed} isVisible={isVisible} />
      <div className={`modal ${isVisible && 'visible'}`}>{children}</div>
    </>
  )
}

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.isVisible === prevProps.isVisible && nextProps.children === prevProps.children
)
