import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import Popup from './Popup'

const Questions = ({ isLoggedIn, questions, changeQuestion }) => {
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (isLoggedIn) {
      setModalShow(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <>
      <Button style={{ width: '90%' }} onClick={onClickHandler}>{isLoggedIn ? 'Add new question' : 'Log in to submit a question'}</Button>
      <div className="questions-list pb-2" style={{ overflow: 'auto', maxHeight: '80vh' }}>
        {questions.map(question => <div key={question._id} className="question mt-2"><Button className="text-start" style={{ width: '90% ' }} variant="light" onClick={() => changeQuestion(question._id)}>{question.questionText}</Button></div>)}
      </div>
      <Popup
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default Questions
