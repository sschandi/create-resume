import React, { useState } from 'react'
import AppContextProvider from '../contexts/AppContext'
import Home from '../components/app/Home'
import Header from '../components/app/Header'
import SelectContent from '../components/app/SelectContent'
import Content from '../components/app/Content'
import Design from '../components/app/Design'

import AppLayout from '../layouts/AppLayout'
import styles from '../styles/app.module.scss'
import SEO from '../components/seo'

enum AppComponents {
  Home = 1,
  Header,
  SelectContent,
  Content,
  // AdditionalContent,
  // Arrangement,
  Design,
  // Colors,
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
      case AppComponents.SelectContent:
        return <SelectContent />
      case AppComponents.Content:
        return <Content />
      case AppComponents.Design:
        return <Design />
      default:
        return <Home />
    }
  }
  return (
    <AppLayout>
      <SEO title="App" />
      <AppContextProvider>
        <ComponentTag />
      </AppContextProvider>
      <div className={styles.navigation}>
        <button disabled={currentComponent === AppComponents.Home} onClick={goBack}>Prev</button>
        <button disabled={currentComponent === AppComponents.Export} onClick={goNext}>Next</button>
      </div>
    </AppLayout>
  )
}

export default App