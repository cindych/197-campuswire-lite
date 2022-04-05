import React, { useState, useEffect } from 'react'
import {
  Routes, Route, Outlet, Link, useNavigate,
} from 'react-router-dom'
import axios from 'axios'

const LeftSide = () => {
  return (
    <div className="left-side">
      <button type="button" onClick={onClickHandler}>{isLoggedIn ? 'Add new Question' : 'Log in to submit a question'}</button>
      <div className="questions-list">
        {renderQuestions()}
      </div>
    </div>
  )
}

export default LeftSide
