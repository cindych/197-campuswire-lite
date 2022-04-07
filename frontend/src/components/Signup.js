import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card className="shadow rounded p-2" style={{ width: '40%' }}>
          <Card.Body>
            <Card.Title className="text-center">SIGNUP</Card.Title>
            <Form
              onSubmit={e => {
                e.preventDefault()
                createUser()
              }}
            >
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Please enter a username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control placeholder="Please enter a password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <div className="text-center">
                <Button type="submit" className="mt-4" variant="primary" disabled={username === '' || password === ''}>Sign Up</Button>
              </div>
            </Form>
            <Card.Text className="mt-2 text-center">
              Already have an account?&nbsp;
              <Link to="/login">Log in here!</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Signup
