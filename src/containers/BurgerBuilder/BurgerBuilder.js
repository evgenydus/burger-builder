import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

export const BurgerBuilder = ({
  history,
  ings,
  isAuthenticated,
  isError,
  onClearBurger,
  onIngredientAdded,
  onIngredientRemoved,
  onInitIngredients,
  onInitPurchase,
  onSetAuthRedirectPath,
  price,
}) => {
  const [isPurchasing, setIsPurchasing] = useState(false)

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(ingredientKey => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setIsPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setIsPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout')
  }

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
        <Burger ingredients={ings} />
        <BuildControls
          clear={onClearBurger}
          disabled={disabledInfo}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          isAuth={isAuthenticated}
          isPurchasable={!updatePurchaseState(ings)}
          price={price}
          purchase={purchaseHandler}
        />
      </>
    )

    orderSummary = <OrderSummary
      ingredients={ings}
      price={price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinue={purchaseContinueHandler}
    />
  }

  return (
    <>
      <Modal modalClosed={purchaseCancelHandler} isVisible={isPurchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  )
}

const mapStateToProps = state => {

  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isError: state.burgerBuilder.isError,
    isAuthenticated: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onClearBurger: () => dispatch(actions.clearBurger()),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
