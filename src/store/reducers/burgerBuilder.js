import * as actionTypes from '../actions/actionTypes'
import { BREAD_PRICE, EMPTY_BURGER, INGREDIENT_PRICES } from '../../appData/appData'
import { updateObject } from '../../shared/utility'

const initialState = {
  ingredients: EMPTY_BURGER,
  totalPrice: BREAD_PRICE,
  isError: false,
  isBuilding: false,
}

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    isBuilding: true,
  }

  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    isBuilding: true,
  }

  return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
  const { salad, bacon, cheese, meat } = action.ingredients
  return updateObject(state, {
    ingredients: { salad, bacon, cheese, meat },
    totalPrice: BREAD_PRICE,
    isError: false,
    isBuilding: false,
  })
}

const resetBurger = (state) => {
  return updateObject(state, initialState)
}

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { isError: true })
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)

    case actionTypes.RESET_BURGER:
      return resetBurger(state)

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action)

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state)

    default:
      return state
  }
}

export default burgerBuilder
