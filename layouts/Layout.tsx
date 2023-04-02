import React from 'react'
import Link from 'next/link'
import Logo from '../images/cr-logo.svg'

const Layout: React.FC<{ fluid?: boolean, children: JSX.Element | JSX.Element[] }> = ({ fluid = false, children }) => {
  return (
    <>
      <div id="navigation">
        <nav className="container">
          <Link href="/">
            <a className="brand"><img src={Logo.src} alt="CR" /></a>
          </Link>
          <div className="nav__items">
            <a href="https://github.com/sschandi/create-resume/" rel="noreferrer" className="nav-link">Repository</a>
            <a href="https://github.com/sschandi/create-resume/issues" rel="noreferrer" className="nav-link">Issues</a>
            <a href="mailto:createresume@chandi.ca" className="nav-link">Contact</a>
            <Link href="/app">
              <button className="btn btn-primary btn-link">App</button>
            </Link>
          </div>
        </nav>
      </div>
      <main className={fluid ? 'container container__fluid' : 'container'}>{children}</main>
      <footer id="footer">
        <div className="container">
          <p>Create Resume by <a href="https://chandi.ca" rel="noreferrer" className="link">SS Chandi</a></p>
        </div>
      </footer>
    </>
  )
}

export default Layout
