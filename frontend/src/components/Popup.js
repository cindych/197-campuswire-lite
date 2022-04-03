import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

const Popup = ({ show, onHide }) => {
  const [question, setQuestion] = useState('')

  const submitQuestion = async () => {
    await axios.post('/api/questions/add', { questionText: question })
    const { data } = await axios.get('api/questions')
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Question:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control as="textarea" rows={3} placeholder="type your question here" value={question} onChange={e => setQuestion(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitQuestion}>Submit Question</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Popup
