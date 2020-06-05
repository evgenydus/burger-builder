import React from 'react';

import './Button.css'

const Button = ({ btnType, children, clicked }) => {
  const classList = ['button', ...btnType].join(' ')

  return (
    <button className={classList} onClick={clicked}>{children}</button>
  )
}

export default Button
