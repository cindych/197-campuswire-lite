import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const createUser = async () => {
    await axios.post('/account/signup', { username, password })
    setMsg('user signup successful')
  }

  useEffect(() => {
    const getUsers = async () => {
    }
  }, [])

  return (
    <>
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
        <button type="submit">Submit</button>
      </form>
      { msg && <p>{msg}</p>}
    </>
  )
}

export default App
