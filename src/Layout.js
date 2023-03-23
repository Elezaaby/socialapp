import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import LeftBar from './components/leftBar/LeftBar'
import RightBar from './components/rightBar/RightBar'
import Navbar from './components/navbar/Navbar';
import './App.scss'

const Layout = () => {
  let url = useLocation()
  let navigate = useNavigate()


  useEffect(() => {
    if (url.pathname === '/socialapp/') {
      return navigate('/socialapp/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  )
}

export default Layout