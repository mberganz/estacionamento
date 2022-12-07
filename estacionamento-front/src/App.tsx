import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ListParks } from './components/ListParks'
import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <ListParks />
    </>
  )
}

export default App
