import React from 'react'
import Modal from '../../UI/Modal/Modal'
import useHttpErrorHandler from '../../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios)

    return (
      <>
        <Modal isVisible={error} modalClosed={clearError}>
          {error && error.message}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
}

export default withErrorHandler
