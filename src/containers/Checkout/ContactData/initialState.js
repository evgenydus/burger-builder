export const initialOrderForm = {
  name: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your Name',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    isValid: false,
    isTouched: false,
  },
  street: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Street',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    isValid: false,
    isTouched: false,
  },
  zipCode: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'ZIP Code',
    },
    value: '',
    validation: {
      isRequired: true,
      minLength: 5,
      maxLength: 6,
      isNumeric: true,
    },
    isValid: false,
    isTouched: false,
  },
  country: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Country',
    },
    value: '',
    validation: {
      isRequired: true,
    },
    isValid: false,
    isTouched: false,
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your E-Mail',
    },
    value: '',
    validation: {
      isRequired: true,
      isEmail: true,
    },
    isValid: false,
    isTouched: false,
  },
  deliveryMethod: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],
    },
    value: 'fastest',
    validation: {},
    isValid: true,
  },
}
