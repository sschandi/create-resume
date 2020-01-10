import React, { useState, useRef } from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import AppContextProvider from '../contexts/AppContext'
import Home from '../components/app/Home'
import Header from '../components/app/Header'
import Content from '../components/app/Content'
import Design from '../components/app/Design'
import Navigation from '../components/app/Navigation'

import AppLayout from '../layouts/AppLayout'
import '../styles/app.scss'
import SEO from '../components/seo'

import AbstractOne from '../images/abstract-1.inline.svg'
import AbstractTwo from '../images/abstract-2.inline.svg'
import AbstractThree from '../images/abstract-3.inline.svg'

enum AppComponents {
  Home = 0,
  Header,
  Content,
  Design
}

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)
  const parallax: any = useRef(null)
  const [contentScrollTop, setcontentScrollTop] = useState(0)
  // Parallax Components Props
  const componentProps = {
    speed: 0,
    style: { overflowY: 'auto' },
    onScroll: (e) => e.stopPropagation()
  }

  const goBack = () => {
    const back = currentComponent - 1
    setCurrentComponent(back)
    parallax.current.scrollTo(back)
  }
  const goNext = () => {
    const next = currentComponent + 1
    setCurrentComponent(next)
    parallax.current.scrollTo(next)
  }

  return (
    <AppLayout>
      <SEO title="App" />
      <AppContextProvider>
        <Parallax pages={5} ref={parallax} horizontal={true} scrolling={false}>
          {/* BG Designs */}
          <ParallaxLayer offset={0.25} factor={1.25} speed={.4}>
            <div className="home-bg">
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
          <ParallaxLayer offset={1} factor={1.5} speed={.3}>
            <div className="home-bg">
              <AbstractOne />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2} factor={1} speed={.6}>
            <div className="home-bg">
              <AbstractTwo />
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2.9} factor={2} speed={.5}>
            <div className="home-bg">
              <AbstractThree />
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
      <Navigation current={currentComponent} prev={goBack} next={goNext} />
    </AppLayout>
  )
}

export default App