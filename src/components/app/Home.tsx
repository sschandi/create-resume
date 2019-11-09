import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const Home = (props) => {
  const { testing, setApp } = useContext(AppContext)
  return (
    <div>
      <h1>Create Resume :) {testing}</h1>
      <button onClick={() => props.next()}>Get Started</button>
      <button onClick={() => setApp({ testing: 'good' })}>Change</button>
    </div>
  )
}

export default Home