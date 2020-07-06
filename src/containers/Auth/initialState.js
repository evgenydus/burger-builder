export const initialAuthForm = {
  login: {
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
  },
  signUp: {
    userName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        isRequired: true,
        isText: true,
      },
      isValid: false,
      isTouched: false,
    },
    phone: {
      elementType: 'input',
      elementConfig: {
        type: 'tel',
        placeholder: 'Phone',
      },
      value: '',
      validation: {
        isRequired: true,
        isPhone: true,
      },
      isValid: false,
      isTouched: false,
    },
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
  },
}
