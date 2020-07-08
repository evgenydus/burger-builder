export const initialAuthForm = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'E-mail',
    },
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
    },
    isValid: false,
    isTouched: false,
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Password',
    },
    value: '',
    validation: {
      isRequired: true,
      minLength: 6,
    },
    isValid: false,
    isTouched: false,
  },
}
