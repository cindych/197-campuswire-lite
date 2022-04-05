import React, { useState, useEffect } from 'react'
import {
  Routes, Route, Outlet, Link, useNavigate,
} from 'react-router-dom'
import axios from 'axios'

const Header = ({ isLoggedIn, checkUserLoggedIn, username }) => {
  const handleLogout = async () => {
    try {
      await axios.post('/account/logout')
      checkUserLoggedIn()
    } catch (err) {
      alert('Error in logging out.')
    }
  }

  return (
    <div className="header">
      <h1>Campuswire Lite</h1>
      {isLoggedIn && (
        <>
          <p>{`Hello ${username}`}</p>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </>
      )}
    </div>
  )
}

export default Header
