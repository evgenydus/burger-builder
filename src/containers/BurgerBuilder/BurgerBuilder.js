import React, { Component } from 'react'
import axios from '../../axios-orders'

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const breadPrice = 4

const INGREDIENT_PRICES = {
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
  salad: 0.5,
}

const initialState = {
  ingredients: null,
  totalPrice: breadPrice,
  isPurchasable: false,
  isPurchasing: false,
  isLoading: false,
  isError: false,
}

class BurgerBuilder extends Component {
  state = { ...initialState }

  componentDidMount() {
    axios.get('https://burger-builder-4a7da.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data})
      })
      .catch(error => {
        this.setState({ isError: true })
      })
  }

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

  purchaseContinueHandler = () => {
    const queryParams = []

    for (let i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`)
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    })
  }

  render() {
    const {
      ingredients,
      isError,
      isLoading,
      isPurchasable,
      isPurchasing,
      totalPrice,
    } = this.state

    const disabledInfo = {
      ...ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = isError ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ingredients) {
      burger = (
        <>
          <Burger ingredients={ingredients}/>
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

      orderSummary = <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
    }

    if (isLoading) {
      orderSummary = <Spinner/>
    }

    return (
      <>
        <Modal modalClosed={this.purchaseCancelHandler} isVisible={isPurchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
