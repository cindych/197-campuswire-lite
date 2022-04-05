import React, { useState, useEffect } from 'react'
import {
  Routes, Route, Outlet, Link, useNavigate,
} from 'react-router-dom'
import axios from 'axios'

import Popup from './Popup'

const LeftSide = ({ isLoggedIn, questions, changeQuestion }) => {
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  const renderQuestions = () => (
    questions.map(question => <div key={question._id} className="question"><button type="button" onClick={() => changeQuestion(question._id)}>{question.questionText}</button></div>)
  )

  const onClickHandler = () => {
    if (isLoggedIn) {
      setModalShow(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="left-side">
      <button type="button" onClick={onClickHandler}>{isLoggedIn ? 'Add new Question' : 'Log in to submit a question'}</button>
      <div className="questions-list">
        {renderQuestions()}
      </div>
      <Popup
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default LeftSide
