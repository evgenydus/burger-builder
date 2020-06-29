import React from 'react';
import PropTypes from 'prop-types'

import './BurgerIngredient.css'

const BurgerIngredient = ({ type }) => {
  let ingredient = null

  switch (type) {
    case ('bread-bottom'):
      ingredient = <div className="bread-bottom" />
      break

    case ('bread-top'):
      ingredient =
        <div className="bread-top">
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
          <div className="seed"/>
        </div>
      break

    case ('meat'):
      ingredient = <div className="meat" />
      break

    case ('cheese'):
      ingredient = <div className="cheese" />
      break

    case ('salad'):
      ingredient = <div className="salad" />
      break

    case ('bacon'):
      ingredient = <div className="bacon" />
      break

    default:
      ingredient = null
  }

  return ingredient
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient
