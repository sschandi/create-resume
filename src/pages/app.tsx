import React, { useState } from 'react'
import AppContextProvider from '../contexts/AppContext'
import Home from '../components/app/Home'
import Header from '../components/app/Header'
import SelectContent from '../components/app/Content'
import Content from '../components/app/Content'

import AppLayout from '../layouts/AppLayout'
import SEO from '../components/seo'

enum AppComponents {
  Home = 1,
  Header,
  SelectContent,
  Content,
  AdditionalContent,
  Arrangement,
  Design,
  Colors,
  Export
}

const App = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)
  const swapComponents = () => {
    setCurrentComponent(currentComponent === AppComponents.Home ? AppComponents.Header : AppComponents.Home)
  }
  const ComponentTag = () => {
    switch (currentComponent) {
      case AppComponents.Home:
        return <Home next={swapComponents} />
      case AppComponents.Header:
        return <Header />
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
      <button onClick={swapComponents}>Swap</button>
    </AppLayout>
  )
}

export default App