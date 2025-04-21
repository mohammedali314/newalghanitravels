import React from 'react'
import './comingSoon.scss'
import { Link } from 'react-router-dom'

const ComingSoon = () => {
  return (
    <div className="comingSoon">
      <div className="content">
        <h1>Coming Soon!</h1>
        <p>We're working hard to bring you something amazing.</p>
        <p className="subtext">This page is under construction.</p>
        <Link to="/" className="homeBtn">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default ComingSoon 