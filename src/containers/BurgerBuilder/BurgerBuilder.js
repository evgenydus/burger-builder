import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-orders'


import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const initialState = {
  isPurchasing: false,
}

class BurgerBuilder extends Component {
  state = { ...initialState }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ isPurchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ isPurchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')
  }

  render() {
    const {
      isPurchasing,
    } = this.state

    const {
      ings,
      isError,
      onClearBurger,
      onIngredientAdded,
      onIngredientRemoved,
      price,
    } = this.props

    const disabledInfo = {
      ...ings
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = isError ? <p>Ingredients can't be loaded!</p> : <Spinner />
    if (ings) {
      burger = (
        <>
          <Burger ingredients={ings}/>
          <BuildControls
            clear={onClearBurger}
            disabled={disabledInfo}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            isPurchasable={!this.updatePurchaseState(ings)}
            price={price}
            purchase={this.purchaseHandler}
          />
        </>
      )

      orderSummary = <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
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

const mapStateToProps = state => {

  return {
    ings: state.ingredients,
    price: state.totalPrice,
    isError: state.isError,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onClearBurger: () => dispatch(burgerBuilderActions.clearBurger()),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
