import React from 'react'
// import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignIn from './components/SignIn'

const App = () => {
  // const { setUser } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        </Routes>
    </>
  )
}
export default App;