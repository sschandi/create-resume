import Link from 'next/link'
import Logo from '../images/cr-logo.svg'

const Layout: React.FC<{ fluid?: boolean, children: JSX.Element | JSX.Element[] }> = ({ fluid = false, children }) => {
  return (
    <>
      <main className={fluid ? 'container container__fluid' : 'container'}>{children}</main>
      <footer id="footer">
        <div className="container">
        </div>
      </footer>
    </>
  )
}

export default Layout
