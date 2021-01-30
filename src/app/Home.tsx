import React from 'react'
import { Link } from 'gatsby'
import Uploader from './Uploader'

const Home: React.FC<{ next: () => void }> = ({ next }) => {
  return (
    <div id="home" className="component-container">
      <div className="jumbotron__title">
        <p className="sub-text">Free | No Sign-up | No Data Collection</p>
        <h1 className="jumbotron__title--create">Create</h1>
        <h1 className="jumbotron__title--resume">
          Resu
          <span className="jumbotron__title--me">me</span>
        </h1>
      </div>
      <Link to="/" className="btn btn-link btn-primary home-link">Learn More</Link>
      <div className="home__actions">
        <h2>Been</h2>
        <h2>Here Before?</h2>
        <p>Continue working on a resume:</p>
        <Uploader next={next} />
      </div>
    </div>
  )
}

export default Home