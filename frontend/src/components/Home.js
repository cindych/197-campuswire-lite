import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LeftSide from './LeftSide'
import Header from './Header'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [questions, setQuestions] = useState([])
  const [currQuestion, setCurrQuestion] = useState({
    questionText: null, author: null, answer: null, _id: null,
  })
  const [answer, setAnswer] = useState('')

  const checkUserLoggedIn = async () => {
    try {
      const { data } = await axios.get('/account/isLoggedIn')
      if (data) {
        setIsLoggedIn(true)
        setUsername(data)
      } else {
        setIsLoggedIn(false)
        setUsername('')
      }
    } catch (err) {
      alert('Error in displaying homepage. Please try again later!')
    }
  }

  const getQuestions = async () => {
    try {
      const { data } = await axios.get('api/questions')
      setQuestions(data)
      // update answer to curent question, if any change
      data.forEach(question => {
        setCurrQuestion(prevState => {
          if (question._id === prevState._id) {
            return { ...prevState, answer: question.answer || '' }
          }
          return prevState
        })
      })
      return data
    } catch (error) {
      alert('Error in getting questions!')
      return null
    }
  }

  const answerQuestion = async () => {
    try {
      await axios.post('/api/questions/answer', { _id: currQuestion._id, answer })
      setAnswer('')
    } catch (err) {
      alert('Unable to submit your answer. Please try again!')
    }
  }

  const changeQuestion = _id => {
    if (_id !== currQuestion._id) { // only execute if different question
      questions.forEach(question => {
        if (question._id === _id) {
          setCurrQuestion({
            ...currQuestion, questionText: question.questionText, answer: question.answer || '', author: question.author, _id: question._id,
          })
        }
      })
      setAnswer('')
    }
  }

  const renderCurrQuestion = () => {
    if (currQuestion.questionText && currQuestion.author && currQuestion._id) {
      return (
        <div className="curr-question">
          <h1>{currQuestion.questionText}</h1>
          <p>{`Author: ${currQuestion.author}`}</p>
          <p>{`Answer: ${currQuestion.answer || ''}`}</p>
        </div>
      )
    } return (
      <h1>No questions asked yet!</h1>
    )
  }

  useEffect(() => {
    checkUserLoggedIn()
    // set curr question to first question if loading for first time
    const firstTime = async () => {
      const data = await getQuestions()
      if (!currQuestion.questionText) {
        setCurrQuestion({
          ...currQuestion, questionText: data[0].questionText, answer: data[0].answer || '', author: data[0].author, _id: data[0]._id,
        })
      }
    }
    firstTime()
  }, [])

  // update getting questions every 2 seconds
  useEffect(() => {
    const intervalID = setInterval(() => {
      getQuestions()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} checkUserLoggedIn={checkUserLoggedIn} username={username} />

      <div className="questions-container">
        <LeftSide isLoggedIn={isLoggedIn} questions={questions} changeQuestion={changeQuestion} />
        <div className="right-side">
          {renderCurrQuestion()}
          {isLoggedIn && (
            <div className="answer-box">
              <p>Answer this question:</p>
              <textarea value={answer} onChange={e => setAnswer(e.target.value)} />
              <button type="button" onClick={answerQuestion} disabled={answer === ''}>
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
