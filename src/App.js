import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss'
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthContext } from './context/authContext';
import Layout from './Layout';
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';

const App = () => {
  const { userData } = useContext(AuthContext)


  const ProtectedRoute = ({ children }) => {
    if (!userData) {
      return <Navigate to='/socialapp/login' />
    }

    return children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='socialapp/register' element={<Register />} />
        <Route path='socialapp/login' element={<Login />} />

        <Route path='socialapp' element={<ProtectedRoute><Layout /></ProtectedRoute>} >
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />}>
            <Route path=':usrId' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App