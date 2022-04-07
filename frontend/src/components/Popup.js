import React, { useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap'

const Popup = ({ show, onHide }) => {
  const [question, setQuestion] = useState('')

  const submitQuestion = async () => {
    await axios.post('/api/questions/add', { questionText: question })
    setQuestion('')
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
        <Form.Control as="textarea" rows={3} placeholder="Type your question here" value={question} onChange={e => setQuestion(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitQuestion} disabled={question === ''}>Submit Question</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Popup
