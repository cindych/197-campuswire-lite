import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const createUser = async () => {
    try {
      await axios.post('/account/signup', { username, password })
      navigate('/')
    } catch (err) {
      alert('There was an issue with signing up. Please try again!')
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          createUser()
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
        <button type="submit" disabled={username === '' || password === ''}>Sign Up</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Log in here!</Link>
      </p>
    </>
  )
}

export default Signup
