import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  show: boolean
  title: string
  close: () => void
  children: JSX.Element
}

const Modal: React.FC<Props> = ({ show, title, close, children }) => {
  const wrapper = useSpring({ opacity: show ? 1 : 0, visibility: show ? 'visible' : 'hidden' })
  const container = useSpring({ transform: show ? 'scale(1)' : 'scale(0)' })
  const [mount, setMount]= useState(false)

  // Workaround for Nextjs 'document.body is undefined' during server side compilation of portal
  useEffect(() => {
    setMount(true)
  }, [])

  return (
    mount ? ReactDOM.createPortal(
      // @ts-ignore
      <animated.div style={wrapper} className="modal__wrapper">
        <animated.div style={container} className="modal__container text--center">
          <h2>{title}</h2>
          <div className="modal__content">
            {children}
          </div>
          <div className="modal__close">
            <button className="btn" onClick={close}>Sluiten</button>
          </div>
        </animated.div>
      </animated.div>
    , document.body) : <div></div>
  )
}

export default Modal