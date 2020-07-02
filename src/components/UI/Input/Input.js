import React from 'react'

import './Input.css'

const Input = ({
  changed,
  elementConfig,
  elementType,
  invalid,
  isTouched,
  label,
  shouldValidate,
  value,
}) => {
  let inputElement = null
  let inputClasses = ['inputElement']

  if (invalid && shouldValidate && isTouched) {
    inputClasses.push('invalid')
    inputClasses = inputClasses.join(' ')
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses}
          onChange={changed}
          value={value}
          {...elementConfig}
        />
      )
      break

    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses}
          onChange={changed}
          value={value}
          {...elementConfig}
        />
      )
      break

    case 'select':
      inputElement = (
        <select className={inputClasses} onChange={changed} value={value}>
          {elementConfig.options.map(({ value, displayValue }) => (
            <option key={value} value={value}>
              {displayValue}
            </option>
          ))}
        </select>
      )
      break

    default:
      inputElement = (
        <input className={inputClasses} value={value} {...elementConfig} />
      )
  }

  return (
    <div className="input">
      <label className="input-label">{label}</label>
      {inputElement}
    </div>
  )
}

export default Input
