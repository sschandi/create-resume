import React from 'react'
import Uploader from './Uploader'

const Home = (props) => {
  return (
    <div id="home" className="component-container">
      <h1>Create Resume</h1>
      <p>Simple resume maker where you control your data.</p>
      <div class="home__actions">
        <button onClick={() => props.next()}>Get Started</button>
        <Uploader />
      </div>
    </div>
  )
}

export default Home