const express = require('express')

const Question = require('../models/question')
const User = require('../models/user')

const router = express.Router()

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    console.log(e)
    res.send('error in retrieving questions')
  }
})

router.post('/questions/add', async (req, res) => {
  const { questionText } = req.body
  try {
    await Question.create({ questionText, author: req.session.username })
    res.send('question was successfully posted')
  } catch (e) {
    console.log(e)
    res.send('question was not able to be posted')
  }
})

router.post('/questions/answer', async (req, res) => {
  const { _id, answer } = req.body
  try {
    await Question.findByIdAndUpdate(_id, { answer })
    res.send('answer added to question')
  } catch (e) {
    console.log(e)
    res.send('error occured while adding answer to question')
  }
})

module.exports = router
