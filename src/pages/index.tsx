import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/Layout"
import ResumeSamples from '../components/ResumeSamples'
import Image from "../components/image"
import SEO from "../components/seo"
import '../styles/home.scss'

const IndexPage = () => (
  <Layout fluid={true}>
    <SEO title="Home" />
    <section className="jumbotron">
      <div className="jumbotron--container">
        <div className="jumbotron__title">
          <h1 className="jumbotron__title--create">Create</h1>
          <h1 className="jumbotron__title--resume">
            Resu
            <span className="jumbotron__title--me">me</span>
          </h1>
          <p>Free. Private. Simple.</p>
          <Link to="/app" className="btn btn-link btn-primary">Go To App</Link>
        </div>
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
    <section className="features container">
      <h1>Features</h1>
    </section>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
