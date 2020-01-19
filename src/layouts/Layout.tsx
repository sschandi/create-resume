/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Logo from '../images/cr-logo.inline.svg'

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
      <div id="navigation">
        <nav className="container">
          <Link to="/" className="brand">
            <Logo />
          </Link>
          <div>
            <a href="https://github.com/sschandi/create-resume/" rel="noreferrer" className="nav-link">Repository</a>
            <a href="https://github.com/sschandi/create-resume/issues" rel="noreferrer" className="nav-link">Issues</a>
            <a href="mailto:createresume@chandi.ca" className="nav-link">Contact</a>
            <Link to="/app" className="btn btn-primary btn-link">App</Link>
          </div>
        </nav>
      </div>
      <main className={fluid ? 'container container__fluid' : 'container'}>{children}</main>
      <footer id="footer">
        <div className="container">
          <p>{data.site.siteMetadata.title} by <a href="https://github.com/sschandi" rel="noreferrer" className="link">SS Chandi</a></p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
