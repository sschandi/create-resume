import React from 'react'
import Uploader from './Uploader'

const Home = (props) => {
  return (
    <div>
      <h1>Create Resume :)</h1>
      <button onClick={() => props.next()}>Get Started</button>
      <Uploader />
    </div>
  )
}

export default Home