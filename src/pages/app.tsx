import React, { useState, useRef } from 'react'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import AppContextProvider from '../contexts/AppContext'
import Home from '../components/app/Home'
import Header from '../components/app/Header'
import Content from '../components/app/Content'
import Design from '../components/app/Design'
import Exporter from '../components/app/Exporter'

import AppLayout from '../layouts/AppLayout'
import '../styles/app.scss'
import SEO from '../components/seo'

enum AppComponents {
  Home = 0,
  Header,
  Content,
  Design,
  Export
}

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)
  const parallax: any = useRef(null)
  // Parallax Components Props
  const componentProps = {
    speed: 0.5,
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
          <ParallaxLayer offset={0} {...componentProps}>
            <Home next={goNext} />
          </ParallaxLayer>
          <ParallaxLayer offset={1} {...componentProps}>
            <Header />
          </ParallaxLayer>
          <ParallaxLayer offset={2} {...componentProps}>
            <Content />
          </ParallaxLayer>
          <ParallaxLayer offset={3} {...componentProps}>
            <Design />
          </ParallaxLayer>
          <ParallaxLayer offset={4} {...componentProps}>
            <Exporter />
          </ParallaxLayer>
        </Parallax>
      </AppContextProvider>
      <div className="navigation">
        <button disabled={currentComponent === AppComponents.Home} onClick={goBack}>Prev</button>
        <button disabled={currentComponent === AppComponents.Export} onClick={goNext}>Next</button>
      </div>
    </AppLayout>
  )
}

export default App