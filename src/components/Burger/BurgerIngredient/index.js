import React from 'react';
import PropTypes from 'prop-types'

import './styles.css'

const BurgerIngredient = ({ type }) => {
  let ingredient = null

  switch (type) {
    case ('bread-bottom'):
      ingredient = <div className="BreadBottom" />
      break

    case ('bread-top'):
      ingredient =
        <div className="BreadTop">
          <div className="Seeds1"/>
          <div className="Seeds2"/>
        </div>
      break

    case ('meat'):
      ingredient = <div className="Meat" />
      break

    case ('cheese'):
      ingredient = <div className="Cheese" />
      break

    case ('salad'):
      ingredient = <div className="Salad" />
      break

    case ('bacon'):
      ingredient = <div className="Bacon" />
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
