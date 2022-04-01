const express = require('express')

const Question = require('../models/question')
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/questions', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    next(new Error('error in retreiving questions'))
  }
})

router.post('/questions/add', isAuthenticated, async ({ body, session }, res) => {
  const { questionText } = body
  try {
    await Question.create({ questionText, author: session.username })
    res.send('question was successfully posted')
  } catch (e) {
    res.send('question was not able to be posted')
  }
})

router.post('/questions/answer', isAuthenticated, async ({ body }, res) => {
  const { _id, answer } = body
  try {
    await Question.findByIdAndUpdate(_id, { answer })
    res.send('answer added to question')
  } catch (e) {
    res.send('error occured while adding answer to question')
  }
})

module.exports = router
