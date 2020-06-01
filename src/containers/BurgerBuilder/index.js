import React, { Component } from 'react'

import BuildControls from '../../components/Burger/BuildControls';
import Burger from '../../components/Burger';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const breadPrice = 4

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
}

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: breadPrice,
  isPurchasable: false,
  isPurchasing: false,
}

class BurgerBuilder extends Component {
  state = { ...initialState }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    this.setState({isPurchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount

    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]

    if (oldCount <= 0) {
      return
    }

    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }

    updatedIngredients[type] = updatedCount

    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  clearAllHandler = () => {
    this.setState({ ...initialState })
  }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false })
  }

  render() {
    const { ingredients, totalPrice, isPurchasable, isPurchasing } = this.state
    const disabledInfo = {
      ...ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Modal modalClosed={this.purchaseCancelHandler} show={isPurchasing}>
          <OrderSummary ingredients={ingredients}/>
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          clear={this.clearAllHandler}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          isPurchasable={!isPurchasable}
          price={totalPrice}
          purchase={this.purchaseHandler}
        />
      </>
    )
  }
}

export default BurgerBuilder
