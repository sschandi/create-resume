import React from 'react'

const Home = (props) => {
  return (
    <div>
      <h1>Create Resume :)</h1>
      <button onClick={() => props.next()}>Get Started</button>
    </div>
  )
}

export default Home