export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

export const checkValidity = (value, rules) => {
  const { isEmail, isNumeric, isPhone, isRequired, isText, maxLength, minLength } = rules
  let isValid = true

  if (isRequired) {
    isValid = value.trim() !== '' && isValid
  }

  if (minLength) {
    isValid = value.length >= minLength && isValid
  }

  if (maxLength) {
    isValid = value.length <= maxLength && isValid
  }

  if (isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }

  if (isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  if (isPhone) {
    const pattern = /^[0-9-+\s()]*$/
    isValid = pattern.test(value) && isValid
  }

  if (isText) {
    const pattern = /^[a-zA-Z ]*$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}
