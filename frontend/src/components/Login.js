import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const { data } = await axios.post('/account/login', { username, password })
      if (data === 'user login successful') {
        navigate('/')
      } else {
        alert('There was an issue with logging in. Please try again!')
      }
    } catch (err) {
      alert('There was an issue with logging in. Please try again!')
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          loginUser()
        }}
      >
        <label>
          Username:
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" disabled={username === '' || password === ''}>Login</button>
      </form>
      <p>
        Don&apos;t have an account?
        <Link to="/signup">Sign up!</Link>
      </p>
    </>
  )
}

export default Login
