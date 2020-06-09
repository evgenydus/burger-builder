import React from 'react';

import './Input.css'

const Input = ({ elementType, label, value, ...props }) => {
  let inputElement = null

  switch (elementType) {
    case ('input'):
      inputElement= <input
        className="inputElement"
        {...props.elementConfig}
        value={value}
      />
      break

    case ('textarea'):
      inputElement = <textarea
        className="inputElement"
        {...props.elementConfig}
        value={value}
      />
      break

    default:
      inputElement = <input
        className="inputElement"
        {...props.elementConfig}
        value={value}
      />
  }

  return (
    <div className="input">
      <label className="input-label">{label}</label>
      {inputElement}
    </div>
  )
}


export default Input
