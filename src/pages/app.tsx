import React, { useState, useEffect, useRef } from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import AppContextProvider from '../contexts/AppContext'
import Home from '../app/Home'
import Header from '../app/Header'
import Content from '../app/Content'
import Design from '../app/Design'
import Navigation from '../app/Navigation'

import AppLayout from '../layouts/AppLayout'
import '../styles/app.scss'
import SEO from '../components/seo'

import CluoSample from '../images/home/cluo-sample.png'
import TeresSample from '../images/home/teres-sample.png'
import CogitoSample from '../images/home/cogito-sample.png'

enum AppComponents {
  Home = 0,
  Header,
  Content,
  Design
}

const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)
  const parallax: any = useRef(null)
  // Parallax Components Props
  const componentProps = {
    speed: 0,
    style: { overflowY: 'auto' },
    onScroll: (e) => e.stopPropagation()
  }

  const go = (to: AppComponents) => {
    setCurrentComponent(to)
    parallax.current.scrollTo(to)
  }

  const goBack = () => {
    const back = currentComponent - 1
    go(back)
  }
  const goNext = () => {
    const next = currentComponent + 1
    go(next)
  }

  // Alert leaving page
  useEffect(() => {
    window.onbeforeunload = () => {
      return 'Download your pdf to keep your progress!'
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  return (
    <AppLayout>
      <SEO title="App" />
      <AppContextProvider>
        <Parallax pages={5} ref={parallax} horizontal={true} scrolling={false}>
          {/* BG Designs */}
          <ParallaxLayer offset={0} factor={1} speed={1}>
            <div className="app-bg">
              <img src={TeresSample} className="parallax-img parallax-img__1" />
              <img src={CogitoSample} className="parallax-img parallax-img__2" />
              <img src={CluoSample} className="parallax-img parallax-img__3" />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={0.25} factor={1.25} speed={.4}>
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
          </ParallaxLayer>
          {/* Main components */}
          <ParallaxLayer offset={0} {...componentProps}>
            <Home next={goNext} />
          </ParallaxLayer>
          <ParallaxLayer offset={1} {...componentProps}>
            <Header />
          </ParallaxLayer>
          <ParallaxLayer offset={2} {...componentProps}>
            <Content active={currentComponent === AppComponents.Content} />
          </ParallaxLayer>
          <ParallaxLayer offset={3} {...componentProps}>
            <Design active={currentComponent === AppComponents.Design} />
          </ParallaxLayer>
        </Parallax>
      </AppContextProvider>
      <Navigation current={currentComponent} prev={goBack} next={goNext} go={go} />
    </AppLayout>
  )
}

export default App