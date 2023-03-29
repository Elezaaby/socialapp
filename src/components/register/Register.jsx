import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { AuthContext } from './../../context/authContext';
import { auth, onAuthStateChanged } from '../../firebase'


const Register = () => {

  const { registerWithEmailAndPassword } = useContext(AuthContext)
  let navigate = useNavigate()
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    userName: '',
    name: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue) {
      registerWithEmailAndPassword(inputValue.name, inputValue.email, inputValue.password, inputValue.userName)
    }
  };

  const getInputValue = (e) => {
    let value = { ...inputValue }
    value[e.target.name] = e.target.value
    setInputValue(value)
    console.log(inputValue)
  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate('/socialapp/home')
      }
    })
  }, [navigate])
  

  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Social App.</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam molestias, odit nihil dolores tenetur excepturi repellendus!</p>
          <span>Don you have an account?</span>
          <Link to='/socialapp/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input onChange={getInputValue} type="text" name='userName' placeholder='Username' />
            <input onChange={getInputValue} type="email" name='email' placeholder='Email' />
            <input onChange={getInputValue} type="password" name='password' placeholder='Password' />
            <input onChange={getInputValue} type="text" name='name' placeholder='Name' />
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register