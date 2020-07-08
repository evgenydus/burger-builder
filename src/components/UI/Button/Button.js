import React from 'react'

import './Button.css'

const Button = ({ btnType, children, clicked, type = 'button', ...props }) => {
  const classList = ['button', ...btnType].join(' ')

  return (
    <button className={classList} onClick={clicked} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
