import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { AuthContext } from './../../context/authContext';
import { auth, onAuthStateChanged } from '../../firebase'

const Login = () => {

  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  })
  const { loginWithEmailAndPassword } = useContext(AuthContext)
  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      loginWithEmailAndPassword(inputValue.email, inputValue.password)
    }
  };

  const getInputValue = (e) => {
    let value = { ...inputValue }
    value[e.target.name] = e.target.value
    setInputValue(value)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/socialapp/home')
      }
    })
  }, [navigate])


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
          <p>Log in with<br />email: socialapp@gmail.com<br />passeord: socialapp123<br />for experience</p>
          <form onSubmit={handleSubmit}>
            <input onChange={getInputValue} name='email' type="email" placeholder='email' />
            <input onChange={getInputValue} name='password' type="password" placeholder='Password' />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Login