import * as actionTypes from '../actions/actionTypes'
import { BREAD_PRICE, EMPTY_BURGER, INGREDIENT_PRICES } from '../../appData/appData';
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: BREAD_PRICE,
  isError: false,
}

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  }

  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  }

  return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
  const { salad, bacon, cheese, meat } = action.ingredients
  return updateObject(state, {
    ingredients: { salad, bacon, cheese, meat,},
    totalPrice: BREAD_PRICE,
    isError: false,
  })
}

const clearBurger = (state) => {
  return updateObject(state, { ingredients: EMPTY_BURGER, isError: false })
}

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { isError: true })
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
    case actionTypes.CLEAR_BURGER: return clearBurger(state)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state)
    default: return state
  }
}

export default burgerBuilder
