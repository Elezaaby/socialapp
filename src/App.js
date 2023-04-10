import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.scss'
import Login from './components/login/Login';
import Register from './components/register/Register';
import { AuthContext } from './context/authContext';
import Layout from './Layout';
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';
import Messages from './components/messages/Messages';

const App = () => {
  const { userData } = useContext(AuthContext)



  return (
    <>
      <Routes>
        <Route path='socialapp/register' element={<Register />} />
        <Route path='socialapp/login' element={<Login />} />
        {userData ?
          <Route path='socialapp' element={<Layout />} >
            <Route path='home' element={<Home />} />
            <Route path='messages' element={<Messages />} />
            <Route path='profile' element={<Profile />}>
              <Route path=':usrId' element={<Profile />} />
            </Route>
          </Route>
          : ''}
      </Routes>
    </>
  )
}

export default App