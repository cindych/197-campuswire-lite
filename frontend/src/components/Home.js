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
      // console.log(`currQuestion in getQuestions: ${JSON.stringify(currQuestion)}`)
    } catch (error) {
      alert('Error in getting questions!')
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
    axios.get('api/questions').then(response => {
      response.data.forEach(question => {
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
    }).catch(err => alert(err))
  }

  const renderQuestions = () => (
    questions.map(question => <div key={question._id} className="question"><button type="button" onClick={() => changeQuestion(question._id)}>{question.questionText}</button></div>)
  )

  const renderCurrQuestion = () => {
    // console.log(`currQuestion in renderCurrQuestion: ${JSON.stringify(currQuestion)}`)
    if (currQuestion.questionText && currQuestion.author) {
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
    getQuestions()

    const firstTime = async () => {
      const { data } = await axios.get('api/questions')
      setQuestions(data)
      // set curr question to first one if loading for first time
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

  useEffect(() => {
    console.log("questions state changed")
  }, [questions])

  // update getting questions every 2 seconds
  useEffect(() => {
    const intervalID = setInterval(() => {
      getQuestions()
    }, 5000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
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
          {isLoggedIn && <Answer questionId={currQuestion._id} getQuestions={getQuestions} changeQuestion={changeQuestion} />}
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
