import React, { useState, useEffect } from 'react'
import {
  Routes, Route, Outlet, Link, useNavigate,
} from 'react-router-dom'
import axios from 'axios'

import Answer from './Answer'
import Popup from './Popup'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [questions, setQuestions] = useState([])
  const [currQuestion, setCurrQuestion] = useState({
    questionText: null, author: null, answer: null, _id: null,
  })
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

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

  const handleLogout = async () => {
    try {
      await axios.post('/account/logout')
      checkUserLoggedIn()
    } catch (err) {
      alert('Error in logging out.')
    }
  }

  const onClickHandler = () => {
    if (isLoggedIn) {
      setModalShow(true)
    } else {
      navigate('/login')
    }
  }

  const changeQuestion = _id => {
    questions.forEach(question => {
      if (question._id === _id) {
        setCurrQuestion({
          ...currQuestion,
          questionText: question.questionText,
          answer: question.answer || '',
          author: question.author,
          _id: question._id,
        })
      }
    })
  }

  const renderQuestions = () => (
    questions.map(question => <div key={question._id} className="question"><button type="button" onClick={() => changeQuestion(question._id)}>{question.questionText}</button></div>)
  )

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
          ...currQuestion,
          questionText: data[0].questionText,
          answer: data[0].answer || '',
          author: data[0].author,
          _id: data[0]._id,
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
      {isLoggedIn && (
        <>
          <p>{`Hello ${username}`}</p>
          <button type="button" onClick={handleLogout}>Log Out</button>
        </>
      )}
      <div className="questions-container">
        <div className="left-side">
          <button type="button" onClick={onClickHandler}>{isLoggedIn ? 'Add new Question' : 'Log in to submit a question'}</button>
          <div className="questions-list">
            {renderQuestions()}
          </div>
        </div>
        <div className="right-side">
          {renderCurrQuestion()}
          {isLoggedIn && <Answer questionId={currQuestion._id} />}
        </div>
      </div>

      <Popup
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default Home
