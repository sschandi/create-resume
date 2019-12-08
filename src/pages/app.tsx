import React, { useState } from 'react'
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
  Home = 1,
  Header,
  Content,
  Design,
  Export
}

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)

  const goBack = () => {
    setCurrentComponent(currentComponent !== AppComponents.Home ? currentComponent - 1 : AppComponents.Home)
  }
  const goNext = () => {
    setCurrentComponent(currentComponent !== AppComponents.Export ? currentComponent + 1 : AppComponents.Export)
  }
  const ComponentTag = () => {
    switch (currentComponent) {
      case AppComponents.Home:
        return <Home next={goNext} />
      case AppComponents.Header:
        return <Header />
      case AppComponents.Content:
        return <Content />
      case AppComponents.Design:
        return <Design />
      case AppComponents.Export:
        return <Exporter />
      default:
        return <Home />
    }
  }
  return (
    <AppLayout>
      <SEO title="App" />
      <AppContextProvider>
          {/* <ComponentTag /> */}
          <Home next={goNext} />
          <Header />
          <Content />
          <Design />
          <Exporter />
      </AppContextProvider>
      <div className="navigation">
        <button disabled={currentComponent === AppComponents.Home} onClick={goBack}>Prev</button>
        <button disabled={currentComponent === AppComponents.Export} onClick={goNext}>Next</button>
      </div>
    </AppLayout>
  )
}

export default App