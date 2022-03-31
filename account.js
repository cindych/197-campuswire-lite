const express = require('express')

const User = require('../models/user')

const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send('user signup was successful')
  } catch (e) {
    console.log(e)
    res.send('user signup had a problem')
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username, password })
    if (user) {
      req.session.username = username
      res.send('user login successful')
    } else {
      res.send('user login unsuccessful')
    }
  } catch (e) {
    console.log(e)
    res.send('user login had a problem')
  }
})

// testing
router.post('/cookie', async (req, res) => {
  const { username, password } = req.body
  req.session.username = username
  res.send('success')
})

router.post('/checkCookie', async (req, res) => {
  if (req.session.username) {
    res.send(`hi ${req.session.username}`)
  } else {
    res.send('hi go to login')
  }
})

router.post('/logout', isAuthenticated, async (req, res) => {
  req.session.username = null
  res.send('user logout successful')
})

module.exports = router
