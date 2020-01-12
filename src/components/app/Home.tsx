import React from 'react'
import { Link } from 'gatsby'
import Uploader from './Uploader'

const Home = (props) => {
  return (
    <div id="home" className="component-container">
      <div className="jumbotron__title">
        <h1 className="jumbotron__title--create">Create</h1>
        <h1 className="jumbotron__title--resume">
          Resu
          <span className="jumbotron__title--me">me</span>
        </h1>
      </div>
      <p>
        Simple, private PDF resume maker.
        <br/>
        <Link to="/" className="link">Learn More.</Link>
      </p>
      <div className="home__actions">
        <h2>Been</h2>
        <h2>Here Before?</h2>
        <p>Continue working on a resume:</p>
        <Uploader next={props.next} />
      </div>
    </div>
  )
}

export default Home