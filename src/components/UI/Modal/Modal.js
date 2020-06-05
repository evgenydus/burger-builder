import React, { Component } from 'react'

import './Modal.css'

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return(
      nextProps.isVisible !== this.props.isVisible || nextProps.children !== this.props.children
    )
  }

  render() {
    const { children, modalClosed, isVisible } = this.props

    return (
      <>
        <Backdrop clicked={modalClosed} isVisible={isVisible}/>
        <div className={`modal ${isVisible && 'visible'}`}>
          {children}
        </div>
      </>
    )
  }
}

export default Modal
