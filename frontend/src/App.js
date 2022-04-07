import React from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
)

export default App
