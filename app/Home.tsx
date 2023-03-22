import React from 'react'
import Link from 'next/link'
import Uploader from './Uploader'

import CluoSample from '../images/home/cluo-sample.png'
import TeresSample from '../images/home/teres-sample.png'
import CogitoSample from '../images/home/cogito-sample.png'

const Home: React.FC<{ next: () => void }> = ({ next }) => {
  return (
    <div id="home">
      <div className="component-container">
        <div className="jumbotron__title">
          <p className="sub-text">Free | No Sign-up | No Data Collection</p>
          <h1 className="jumbotron__title--create">Create</h1>
          <h1 className="jumbotron__title--resume">
            Resu
            <span className="jumbotron__title--me">me</span>
          </h1>
        </div>
        <Link href="/">
          <button className="btn btn-link btn-primary home-link">Learn More</button>
        </Link>
        <button className="btn btn-link btn-primary home-link" onClick={() => next()}>Begin</button>
        <div className="home__actions">
          <h2>Been</h2>
          <h2>Here Before?</h2>
          <p>Continue working on a resume:</p>
          <Uploader next={next} />
        </div>
      </div>
      <div className="app-bg--wrapper">
        <div className="app-bg">
          <img src={TeresSample.src} alt="" className="parallax-img parallax-img__1" />
          <img src={CogitoSample.src} alt="" className="parallax-img parallax-img__2" />
          <img src={CluoSample.src} alt="" className="parallax-img parallax-img__3" />
        </div>
        <div className="app-bg__triangle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 205.05208 132.29167"
            width="100%"
            height="100%"
            preserveAspectRatio="none">
            <g
              id="layer1">
              <path
                d="M 139.39734,3.6290322e-6 -2.375e-6,132.29166 H 139.39734 205.05209 V 3.6290322e-6 Z"
                style={{ fill: '#2d9cca' }}
                id="rect833" />
            </g>
          </svg>
        </div>
        <div className="app-bg__square-mini"></div>
      </div>
    </div>
  )
}

export default Home