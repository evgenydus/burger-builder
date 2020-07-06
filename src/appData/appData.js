export const BREAD_PRICE = 4

export const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
}

export const EMPTY_BURGER = {
  salad: 0,
  bacon: 0,
  cheese: 0,
  meat: 0,
}

export const authEndpoints = {
  signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  login:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
}

export const firebaseApiKey = 'AIzaSyBQsjP9tWeeB9zyT33p0McR2DEj8ktwzYw'

export const ingredientsUrl =
  'https://burger-builder-4a7da.firebaseio.com/ingredients.json'
