import React from 'react'

import './Card.css'

const Card = ({ cardStyle, children }) => (
  <div className={`card ${cardStyle}`}>{children}</div>
)

export default Card
