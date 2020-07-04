import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './BurgerBuilder.css'

import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import PageTitle from '../../components/UI/PageTitle/PageTitle';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'

export const BurgerBuilder = ({
  history,
  ings,
  isAuthenticated,
  isBuilding,
  isError,
  onClearBurger,
  onIngredientAdded,
  onIngredientRemoved,
  onInitIngredients,
  onInitPurchase,
  onSetAuthRedirectPath,
  price,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    !isBuilding && onInitIngredients()
  }, [onInitIngredients, isBuilding])

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)

    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setIsModalVisible(true)
    } else {
      onSetAuthRedirectPath('/checkout/contact-data')
      onInitPurchase()
      history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setIsModalVisible(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    history.push('/checkout/contact-data')
  }

  let orderSummary = null

  let burger = isError ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (ings) {
    burger = (
      <div className="burger-builder-container">
        <Burger ingredients={ings} />
        <BuildControls
          clear={onClearBurger}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          ings={ings}
          isAuth={isAuthenticated}
          isPurchasable={!updatePurchaseState(ings)}
          price={price}
          purchase={purchaseHandler}
        />
      </div>
    )

    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    )
  }

  return (
    <>
      <Modal modalClosed={purchaseCancelHandler} isVisible={isModalVisible}>
        {orderSummary}
      </Modal>
      <PageTitle>Create your burger!</PageTitle>
      {burger}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isError: state.burgerBuilder.isError,
    isAuthenticated: state.auth.token,
    isBuilding: state.burgerBuilder.isBuilding,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onClearBurger: () => dispatch(actions.resetBurger()),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
