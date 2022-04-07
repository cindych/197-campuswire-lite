import React from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

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
    <div className="px-3 header d-flex justify-content-between mt-2">
      <h3>Campuswire Lite 📓</h3>
      {isLoggedIn && (
        <div className="d-flex align-items-center">
          <p className="m-0 p-0 pe-2">{`Hello ${username}`}</p>
          <Button className="shadow-sm" variant="light" size="sm" onClick={handleLogout}>Log Out</Button>
        </div>
      )}
    </div>
  )
}

export default Header
