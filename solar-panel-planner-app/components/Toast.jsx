import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer 
        position="bottom-left"
        autoClose={5000}
        closeOnClick
        pauseOnHover
    />
  )
}

export default Toast