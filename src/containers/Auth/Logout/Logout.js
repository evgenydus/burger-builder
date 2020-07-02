import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/index'

const Logout = ({ onCloseSession }) => {
  useEffect(() => {
    onCloseSession()
  }, [onCloseSession])

  return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
  return {
    onCloseSession: () => dispatch(actions.closeSession())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
