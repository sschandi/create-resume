import React from 'react'

import AppLayout from '../layouts/AppLayout'
import SEO from '../components/seo'

const App = () => {
  return (
    <AppLayout>
      <SEO title="App" />
      <h1>Hello world this is App</h1>
    </AppLayout>
  )
}

export default App