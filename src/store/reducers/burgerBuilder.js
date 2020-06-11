import * as actionTypes from '../actions/actionTypes'
import { BREAD_PRICE, EMPTY_BURGER, INGREDIENT_PRICES } from '../../appData/appData';

const initialState = {
  ingredients: null,
  totalPrice: BREAD_PRICE,
  isError: false,
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }

    case actionTypes.CLEAR_BURGER:
      return {
        ...state,
        ingredients: EMPTY_BURGER,
        isError: false,
      }

    case actionTypes.SET_INGREDIENTS:
      const { salad, bacon, cheese, meat } = action.ingredients
      return {
        ...state,
        ingredients: {
          salad,
          bacon,
          cheese,
          meat,
        },
        isError: false,
      }

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        isError: true,
      }

    default:
      return state
  }
}

export default burgerBuilder
