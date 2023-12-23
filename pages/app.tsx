import { useState, useEffect, memo, type ReactElement } from 'react'
import { useRouter } from 'next/router'
import AppContextProvider from '../contexts/AppContext'
import Header from '../app/Header'
import Content from '../app/Content'
import Design from '../app/Design'
import Navigation from '../app/Navigation'
import Uploader from '../app/Uploader'
import Modal from '../components/Modal'

import AppLayout from '../layouts/AppLayout'
import SEO from '../components/seo'

export enum AppComponents {
  Header = 0,
  Content,
  Design
}

const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState<AppComponents>(AppComponents.Header)

  const appPage = (prop: AppComponents): ReactElement<any, any> => {
    switch (prop) {
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
      return 'Download je pdf om de aanpassingen te bewaren!'
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [])

  // If continue query is present, (sent from 'Continue Working' on home page)
  // open modal for user to upload their resume
  const [showUpload, setShowUpload] = useState(false)
  const afterClose = () => {
    router.replace('/app')
    setShowUpload(false)
  }
  const router = useRouter()
  useEffect(() => {
    if (router.query.continue) {
      setShowUpload(true)
    }
  }, [router.query])

  return (
    <AppLayout>
      <SEO title="App" />
      <AppContextProvider>
        <div className="app-page app-page__component">
          <Navigation current={currentComponent} prev={goBack} next={goNext} go={go} />
          <div className="app-component">
            {appPage(currentComponent)}
          </div>
        </div>
        <Modal show={showUpload} title="Werk verder aan je CV." close={afterClose}>
          <div className="app-continue">
            <p>Upload je PDF die je met de CV maker hebt gemaakt om verder te gaan waar je gebleven was.</p>
            <Uploader next={afterClose} btnClasses="btn btn-primary btn-lg" />
          </div>
        </Modal>
      </AppContextProvider>
    </AppLayout>
  )
}

export default memo(App)
