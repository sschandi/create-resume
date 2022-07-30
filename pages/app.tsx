import React, { useState, useEffect, ReactElement } from 'react'
import AppContextProvider from '../contexts/AppContext'
import Home from '../app/Home'
import Header from '../app/Header'
import Content from '../app/Content'
import Design from '../app/Design'
import Navigation from '../app/Navigation'

import AppLayout from '../layouts/AppLayout'
import SEO from '../components/seo'

enum AppComponents {
  Home = 0,
  Header,
  Content,
  Design
}

const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Home)

  const appPage = (prop: AppComponents): ReactElement<any, any> => {
    switch (prop) {
      case AppComponents.Home:
        return <Home next={goNext} />
      case AppComponents.Header:
        return <Header />
      case AppComponents.Content:
        return <Content active={currentComponent === AppComponents.Content} />
      case AppComponents.Design:
        return <Design active={currentComponent === AppComponents.Design} />
    }
  }

  const go = (to: AppComponents) => {
    setCurrentComponent(to)
  }

  const goBack = () => {
    const back = currentComponent - 1
    go(back)
  }
  const goNext = () => {
    const next = currentComponent + 1
    go(next)
  }

  useEffect(() => {
    go(currentComponent)
  }, [currentComponent])

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
        <div className="app-page">
          {appPage(currentComponent)}
        </div>
      </AppContextProvider>
      <Navigation current={currentComponent} prev={goBack} next={goNext} go={go} />
    </AppLayout>
  )
}

export default App