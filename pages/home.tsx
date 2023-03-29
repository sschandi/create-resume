import type { NextPage } from 'next'
import Link from 'next/link'

import Layout from '../layouts/Layout'
import SEO from "../components/seo"

import CluoImg from '../images/home/cluo-sample.png'
import CogitoImg from '../images/home/cogito-sample.png'
import TeresImg from '../images/home/teres-sample.png'

import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <Layout fluid={true}>
      <SEO title="Home" />
      <section className={styles.jumbotron}>
        <div className={styles.title}>
          <h1>
            Create Resu<span>me</span>
          </h1>
          <p>Create a professional resume for free, in minutes, without sacrificing your privacy.</p>
          <p>Your data <strong>never</strong> leaves your computer.</p>
        </div>
        <div className={styles.action}>
          <Link href="/app">
            <a className="btn btn-link btn-primary btn-lg">Get Started for Free</a>
          </Link>
          {/* <div className={styles.or}>
            <span>Or</span>
          </div> */}
          <Link href={{ pathname: '/app', query: { continue: true }}}>
            <a className="btn btn-link btn-secondary">Continue Working</a>
          </Link>
          {/* Removed in favour of redirecting users to app with continue query */}
          {/* <div className={styles.dropperWrapper}>
            <div className={styles.dropper}>
              Continue working on your resume.<br />
              Click to open your PDF.
            </div>
          </div> */}
        </div>
        <div className={styles.spacer} />
        <div className={styles.samples}>
          <img src={CluoImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleOne} />
          <img src={CogitoImg.src} alt="" className={styles.sampleImg}  />
          <img src={TeresImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleThree}  />
        </div>
      </section>
    </Layout>
  )
}

export default Home
