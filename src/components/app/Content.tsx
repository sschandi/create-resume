import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useSpring, useTransition, animated } from 'react-spring'
import { AppContext } from '../../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'
import useWindowSize from '../useWindowSize'

const MAX_MOBILE_SIZE = 1200

const Content = ({ active }) => {
  const { sections } = useContext(AppContext)
  const transitions = useTransition(sections, item => item.id, {
    from: { transform: 'translate3d(10rem,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(10rem,0,0)', opacity: 0 },
    config: { mass: 1, tension: 140, friction: 20 }
  })

  const [scrollLoc, setScrollLoc] = useSpring(() => ({ y: 0}))
  const scrollToBottom = () => {
    const content = document.getElementById('content')
    setScrollLoc({
      y: content.scrollHeight,
      reset: true,
      from: { y: content.scrollTop },
      // @ts-ignore I don't even know what typescript thinks this is, but its right according to documentation
      onFrame: props => {
        content.scrollTop = props.y
      }
    })
    // Close the content box on adding in mobile
    if (size.width <= MAX_MOBILE_SIZE) {
      setShowMobile(false)
    }
  }

  const size = useWindowSize()
  const [showMobile, setShowMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const sidebar = useSpring({ height: showSidebar && showMobile && active ? '100%' : '0%' })
  const centerContent = useSpring({
    opacity: showSidebar ? 0 : 1,
    position: 'absolute',
    marginRight: '1rem',
    pointerEvents: showSidebar ? 'none' : 'unset'
  })
  useEffect(() => {
    if (size.width > MAX_MOBILE_SIZE) {
      setShowMobile(true)
      return
    }
    setShowMobile(false)
  }, [size])
  useEffect(() => {
    if (sections.length > 0) {
      setShowSidebar(true)
      return
    }
    setShowSidebar(false)
  }, [sections])

  return (
    // @ts-ignore scrollTop is a thing for animated divs
    <animated.div id="content" scrollTop={scrollLoc.y}>
      <div className="component-container">
        <div className="content__main">
          <h1>Resume Content</h1>
          <p>Now lets fill everything with Content</p>
          <animated.div style={centerContent}>
            <SelectContent scrollToBottom={scrollToBottom} />
          </animated.div>
          <div className="content__elements">
            {transitions.map(({ item, props }, index) => {
              return (
                <animated.div key={item.id} style={props}>
                  <Section section={item} index={index} />
                </animated.div>
              )
            })}
          </div>
        </div>
        {active && sections.length > 0 && ReactDOM.createPortal(
          <>
            <animated.div style={sidebar} className="content__actions">
              <SelectContent scrollToBottom={scrollToBottom} />
            </animated.div>
            <button
              className={`btn btn-icon icon__add content__actions--btn ${showMobile ? 'close' : ''}`}
              style={{ position: 'fixed', top: '1rem', right: '1rem' }}
              onClick={() => setShowMobile(!showMobile)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </>,
          document.getElementById('app-layout')
        )}
      </div>
    </animated.div>
  )
}

export default Content