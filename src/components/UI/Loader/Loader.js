import React from 'react'

import './Loader.css'

const Loader = () => (
  <div className="loader">
      <div className="loader-ingredient loader-bread-top">
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
          <div className="loader-seed" />
      </div>
      <div className="loader-ingredient loader-salad" />
      <div className="loader-ingredient loader-bacon" />
      <div className="loader-ingredient loader-cheese" />
      <div className="loader-ingredient loader-meat" />
      <div className="loader-ingredient loader-bread-bottom" />
  </div>
)

export default Loader
