import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

import Questions from './Questions'
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
      alert('Error checking if user is logged in!')
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

  useEffect(() => {
    checkUserLoggedIn()
    // set curr question to first question if loading for first time
    const firstTime = async () => {
      const data = await getQuestions()
      if (!currQuestion.questionText && data.length > 0) {
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

      <div className="questions-container d-flex p-3">
        <div className="left-side text-center" style={{ width: '20vw' }}>
          <Questions isLoggedIn={isLoggedIn} questions={questions} changeQuestion={changeQuestion} />
        </div>
        <Card className={isLoggedIn ? 'right-side d-flex flex-column justify-content-evenly rounded shadow p-3 ms-3' : 'right-side rounded shadow p-3 ms-3'} style={{ width: '70vw', height: '50vh', maxHeight: '700px' }}>
          {currQuestion.questionText && currQuestion.author && currQuestion._id ? (
            <div className="curr-question">
              <h1>{currQuestion.questionText}</h1>
              <p className="m-0 p-0 mb-1">
                <b>Author:&nbsp;</b>
                {currQuestion.author}
              </p>
              <p>
                <b>Answer:&nbsp;</b>
                {currQuestion.answer || ''}
              </p>
            </div>
          ) : (
            <h1 style={{ alignSelf: 'start', height: '100%' }}>No questions asked yet!</h1>
          )}
          {isLoggedIn && currQuestion.questionText && (
            <div className="answer-box">
              <p>Answer this question:</p>
              <Form.Control as="textarea" rows={3} value={answer} onChange={e => setAnswer(e.target.value)} />
              <Button className="mt-3" style={{ width: '100%' }} onClick={answerQuestion} disabled={answer === ''}>Submit Answer</Button>
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

export default Home
