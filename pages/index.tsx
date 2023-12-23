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
           <section className="container">
        <h1 className={styles.createHeader}>CV maker</h1>
        <div className={styles.create}>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>1.</div>
            <h2>Starten</h2>
            <p>Voeg je inhoud toe en pas de opmaak aan om je cv persoonlijk te maken.</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>2.</div>
            <h2>Ontwerp</h2>
            <p>Kies uit een selectie van kleuren voor de vormgeving van je cv.
</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>3.</div>
            <h2>Download</h2>
            <p>Download het gemaakte cv.</p>
          </div>
          <div className={styles.createStep}>
            <div className={styles.createNumber}>4.</div>
            <h2>Account</h2>
            <p>Maak een account aan en voeg het gemaakte cv toe.</p>
          </div>
        </div>
      </section>
      <div className={styles.action}>
          <Link href="/app">
            <a className="btn btn-link btn-primary btn-lg">CV AANMAKEN</a>
          </Link>
          <Link href={{ pathname: '/app', query: { continue: true }}}>
            <a className="btn btn-link btn-secondary">CV BEWERKEN</a>
          </Link>
        </div>
        <section className={styles.jumbotron}>
        <div className={styles.title}>
          <h1>
          </h1>
        </div>
        <div className={styles.spacer} />
        <div className={styles.samples}>
          <img src={CluoImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleOne} />
          <img src={CogitoImg.src} alt="" className={styles.sampleImg}  />
          <img src={TeresImg.src} alt="" className={styles.sampleImg + ' ' + styles.sampleThree}  />
        </div>
      </section>
      <section className="container">
        <div className={styles.privacy}>
          <h1>Je privacy <span>beschermd</span></h1>
          <p>
          In tegenstelling tot veel andere hulpprogramma's voor het maken van cv's,
           werkt de CV maker tool volledig client-side.<br></br>
           <br></br>
         <strong>Dat betekent dat er geen externe gegevensverwerking of servers bij betrokken zijn.</strong> </p>
          <p>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Home
