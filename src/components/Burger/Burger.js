import React from 'react'

import './Burger.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients).map(ingredientKey => {
    return [...Array(ingredients[ingredientKey])].map((item, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey}/>
    })
  })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }

  return (
    <div className="burger">
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default Burger
