import React from 'react'

import './Button.css'

const Button = ({ btnType, children, clicked, disabled }) => {
  const classList = ['button', ...btnType].join(' ')

  return (
    <button className={classList} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  )
}

export default Button
