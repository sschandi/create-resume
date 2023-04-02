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
            <a className="btn btn-link btn-primary btn-lg">Create Your Resume</a>
          </Link>
          <Link href={{ pathname: '/app', query: { continue: true }}}>
            <a className="btn btn-link btn-secondary">Continue Working</a>
          </Link>
        </div>
        <div className={styles.spacer} />
        <div className={styles.samples}>
          <img src={CluoImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleOne} />
          <img src={CogitoImg.src} alt="" className={styles.sampleImg}  />
          <img src={TeresImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleThree}  />
        </div>
      </section>
      <section className="container">
        <h1 className={styles.createHeader}>Create Your Perfect Resume</h1>
        <div className={styles.create}>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>1.</div>
            <h2>Create</h2>
            <p>Add your content and tweak the formatting to personalize your resume message.</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>2.</div>
            <h2>Design</h2>
            <p>Choose from a selection of professional templates, then customize your colors to match your style.</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>3.</div>
            <h2>Export</h2>
            <p>Generate a PDF resume that&apos;s ready to download, print, or email to potential employers.</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>4.</div>
            <h2>Resume</h2>
            <p>Need to update your resume later? No problem! Simply re-upload your file to pick up where you left off, with all your changes intact.</p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className={styles.privacy}>
          <h1>Your Privacy <span>Preserved</span></h1>
          <p>
            Unlike many other resume-building tools, Create Resume works entirely client-side -
            that means there&apos;s no external data processing or servers involved. Instead, everything happens right in your browser.
            This approach ensures that <strong>your data is never seen, sent, or stored</strong> by us or anybody else.
          </p>
          <p>
            As an open-source project, all of the code is available in <a href="https://github.com/sschandi/create-resume" rel="noreferrer" target="_blank" className="link">our repository.</a>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
