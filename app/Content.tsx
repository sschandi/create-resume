import React, { useContext } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'
import { sectionShrinkTransitionConfig } from './helpers/springs'

const Content: React.FC<{ active: boolean }> = ({ active }) => {
  const { sections } = useContext(AppContext)
  const transitions = useTransition(sections, sectionShrinkTransitionConfig)

  const scrollToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }

  return (
    <animated.div id="content">
      <div className="component-container">
        <div className="content__main">
          <div>
            <h1>Content</h1>
            <p>Add your Resume Content</p>
            <div className="content__elements">
              {transitions((styleProps, item, t, index: number)=> {
                return (
                  <animated.div key={item.id} style={{ ...styleProps, overflow: 'hidden' }}>
                    <Section section={item} index={index} />
                  </animated.div>
                )
              })}
              {sections.length === 0 &&
                <div className="content__empty">
                  Add Content to get your Resume Started!
                </div>
              }
            </div>
          </div>
          <div className="content__select--wrapper">
            <SelectContent scrollToBottom={scrollToBottom} />
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default Content