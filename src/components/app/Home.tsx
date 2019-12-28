import React from 'react'
import Uploader from './Uploader'

const Home = (props) => {
  return (
    <div id="home" className="component-container">
      <h1>Create Resume</h1>
      <p className="subtitle">Simple resume maker where you control your data.</p>
      <button className="btn btn-primary" onClick={() => props.next()}>Get Started</button>
      <div className="home__actions">
        <h2>Been</h2>
        <h2>Here Before?</h2>
        <p>Continue working on a resume:</p>
        <Uploader />
      </div>
    </div>
  )
}

export default Home