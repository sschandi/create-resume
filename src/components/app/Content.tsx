import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'
import { useSpring, useTransition, animated } from 'react-spring'

const Content = ({ active }) => {
  const { sections } = useContext(AppContext)
  // TODO: The key is section.title which is not unique
  const transitions = useTransition(sections, item => item.id, {
    from: { transform: 'translate3d(5rem,0,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(-5rem,0,0)' },
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
  }

  return (
    // @ts-ignore scrollTop is a thing for animated divs
    <animated.div id="content" scrollTop={scrollLoc.y}>
      <div className="component-container">
        <div className="content__main">
          <h1>Content</h1>
          <p>Now lets fill everything with Content</p>
          {transitions.map(({ item, props }, index) => {
            return (
              <animated.div key={item.id} style={props}>
                <Section section={item} index={index} />
              </animated.div>
            )
          })}
        </div>
        { active ? ReactDOM.createPortal(
          <div className="content__actions">
            <SelectContent scrollToBottom={scrollToBottom} />
          </div>,
          document.getElementById('app-layout')
        ) : null}
      </div>
    </animated.div>
  )
}

export default Content