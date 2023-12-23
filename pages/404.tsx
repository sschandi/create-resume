import type { NextPage } from 'next'

import Layout from '../layouts/Layout'

const ErrorPage: NextPage = () => {
  return (
    <Layout>
      <div className="error-page">
        <h1>404</h1>
        <h2>Pagina niet gevonden.</h2>
      </div>
    </Layout>
  )
}

export default ErrorPage