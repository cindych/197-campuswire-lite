import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Answer = ({ questionId }) => {
  const [answer, setAnswer] = useState('')

  const answerQuestion = async () => {
    try {
      await axios.post('/api/questions/answer', { _id: questionId, answer })
      setAnswer('')
    } catch (err) {
      alert('Unable to submit your answer. Please try again!')
    }
  }

  return (
    <div className="answer-box">
      <p>Answer this question:</p>
      <textarea value={answer} onChange={e => setAnswer(e.target.value)} />
      <button type="button" onClick={answerQuestion}>Submit Answer</button>
    </div>
  )
}

export default Answer
