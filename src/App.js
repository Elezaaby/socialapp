import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import Login from './components/login/Login';
import Register from './components/register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='socialapp/register' element={<Register />} />
        <Route path='socialapp/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App