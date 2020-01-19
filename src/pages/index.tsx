import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/Layout"
import ResumeSamples from '../components/home/ResumeSamples'
import PrivacyWallImage from '../components/home/PrivacyWallImage'
import NoCostImage from '../components/home/NoCostImage'
import SimpleContentImage from '../components/home/SimpleContentImage'
// @ts-ignore sometimes it flags it, sometimes it doesn't
import TeresImg from '../images/home/teres-sample.png'
import SEO from "../components/seo"
import '../styles/home.scss'

const IndexPage = () => {
  return (
    <Layout fluid={true}>
      <SEO title="Home" />
      <section className="jumbotron">
        <div className="jumbotron--container">
          <div className="jumbotron__title">
            <p className="sub-text">100% Free | No Sign-up | No Data Collection</p>
            <h1 className="jumbotron__title--create">Create</h1>
            <h1 className="jumbotron__title--resume">
              Resu
              <span className="jumbotron__title--me">me</span>
            </h1>
          </div>
          <p>PDF Resume Generator</p>
          <Link to="/app" className="btn btn-link btn-primary">Go To App</Link>
        </div>
        <div className="jumbotron__samples">
          <ResumeSamples />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 205.05208 132.29167"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          className="jumbotron__bg">
          <g
            id="layer1">
            <path
              d="M 139.39734,3.6290322e-6 -2.375e-6,132.29166 H 139.39734 205.05209 V 3.6290322e-6 Z"
              style={{ fill: '#2d9cca' }}
              id="rect833" />
          </g>
        </svg>
      </section>
      <section className="features privacy container">
        <div className="privacy__bg"></div>
        <div className="privacy__content">
          <h2>Own Your Data</h2>
          <div className="privacy__content--text">
            <p>
              Create Resume works entirely client-side. Your data is never seen, sent, or stored by us.
            </p>
            <p>
              You can view the code for this project in <a href="https://github.com/sschandi/create-resume" rel="noreferrer" target="_blank" className="link">our repository.</a>
            </p>
          </div>
        </div>
        <div className="privacy__image">
          <PrivacyWallImage />
        </div>
      </section>
      <section className="features simple container">
        <div className="simple__image simple__image--left">
          <SimpleContentImage />
        </div>
        <div className="simple__content">
          <h2>Simple</h2>
          <ol>
            <li>Add your resume content</li>
            <li>Choose and customize from templates</li>
            <li>Generate your PDF Resume</li>
            <span className="optional">Need to make changes in the future?</span>
            <li>Re-upload your resume to continue where you left off</li>
          </ol>
        </div>
        <div className="simple__image simple__image--right">
          <img src={TeresImg} />
        </div>
      </section>
      <section className="features free container">
        <div className="free__bg"></div>
        <div className="free__image">
          <NoCostImage />
        </div>
        <div className="free__content">
          <h2>Free</h2>
          <div className="free__content--text">
            <p>
              Create Resume's goal is to help people easily make a resume while maintaining control over their personal information.
            </p>
          </div>
        </div>
      </section>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage
