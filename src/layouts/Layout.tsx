/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.scss"

const Layout = ({ fluid = false, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <main className={fluid ? 'container container__fluid' : 'container'}>{children}</main>
      <footer id="footer">
        <div className="container">
          <p>{data.site.siteMetadata.title} by <a href="https://github.com/sschandi" className="link">SS Chandi</a></p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
