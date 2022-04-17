import React from 'react'
import './Modal.scss'
const Modal = ({component}) => {
  return (
    <div className='modal-bg'>
      {component}
    </div>
  )
}

export default Modal