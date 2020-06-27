import { put } from 'redux-saga/effects'

import axios from '../../axios-orders';

import * as actions from '../actions'
import { ingredientsUrl } from '../../appData/appData';


export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(ingredientsUrl)
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientsFailed())
  }
}
