import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/Layout"
import Image from "../components/image"
import SEO from "../components/seo"
import '../styles/home.scss'

const IndexPage = () => (
  <Layout fluid={true}>
    <SEO title="Home" />
    <section className="jumbotron">
      <div className="jumbotron__title">
        <h1 className="jumbotron__title--create">Create</h1>
        <h1 className="jumbotron__title--resume">
          Resu
          <span className="jumbotron__title--me">me</span>
        </h1>
        <p>Free, Private, Simple.</p>
      </div>
    </section>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
