import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'
import { useTransition, animated } from 'react-spring'

const Content = ({ active, scrollTop }) => {
  const { sections } = useContext(AppContext)
  // TODO: The key is section.title which is not unique
  const transitions = useTransition(sections, section => section.title, {
    from: { transform: 'translate3d(5rem,0,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(-5rem,0,0)' },
  })

  return (
    <div id="content" className="component-container">
      <div className="content__main">
        <h1>Content</h1>
        <p>Now lets fill everything with Content</p>
        {transitions.map(({ item, props, key}, index) => {
          return (
            <animated.div key={key} style={props}>
              <Section section={item} index={index} />
            </animated.div>
          )
        })}
      </div>
      { active ? ReactDOM.createPortal(
        <div className="content__actions">
          <SelectContent />
        </div>,
        document.getElementById('app-layout')
      ) : null}
    </div>
  )
}

export default Content