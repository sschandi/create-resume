import React from 'react'
import type { NextPage } from 'next'

import Layout from '../layouts/Layout'

const ErrorPage: NextPage = () => {
  return (
    <Layout>
      <div className="error-page">
        <h1>404</h1>
        <h2>This page could not be found.</h2>
      </div>
    </Layout>
  )
}

export default ErrorPage