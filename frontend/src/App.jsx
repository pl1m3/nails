import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegForm from './components/RegForm/RegForm'
import AutForm from './components/AutForm/AutForm'
import PersonalAccount from './components/PersonalAccount/PersonalAccount'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/pa' element={<PersonalAccount/>}/>
        <Route path='/' element={<RegForm />} />
        <Route path='/reg' element={<RegForm />} />
        <Route path='/aut' element={<AutForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
