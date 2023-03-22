import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from './../../context/authContext';

const Login = () => {

  const { login } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    login();
    navigate('/socialapp/home')
  };


  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam molestias, odit nihil dolores tenetur excepturi repellendus!</p>
          <span>Don't you have an account?</span>
          <Link to='/socialapp/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder='Username' />
            <input type="password" placeholder='Password' />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Login