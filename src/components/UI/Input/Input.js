import React from 'react';

import './Input.css'

const Input = ({ changed, elementConfig, elementType, label, value }) => {
  let inputElement = null

  switch (elementType) {
    case ('input'):
      inputElement= <input
        className="inputElement"
        onChange={changed}
        value={value}
        {...elementConfig}
      />
      break

    case ('textarea'):
      inputElement = <textarea
        className="inputElement"
        onChange={changed}
        value={value}
        {...elementConfig}
      />
      break

    case ('select'):
      inputElement = <select
        className="inputElement"
        onChange={changed}
        value={value}
      >
        {elementConfig.options.map(({ value, displayValue }) => (
          <option key={value} value={value}>
            {displayValue}
          </option>
          )
        )}
      </select>
      break

    default:
      inputElement = <input
        className="inputElement"
        value={value}
        {...elementConfig}
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
