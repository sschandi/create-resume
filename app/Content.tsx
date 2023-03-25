import React, { useContext } from 'react'
import { useSpring, useTransition, animated } from '@react-spring/web'
import { AppContext } from '../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'

const Content: React.FC<{ active: boolean }> = ({ active }) => {
  const { sections } = useContext(AppContext)
  const transitions = useTransition(sections, {
    keys: item => item.id,
    from: { transform: 'translate3d(10rem,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(10rem,0,0)', opacity: 0 },
    config: { mass: 1, tension: 140, friction: 20 }
  })

  const [scrollLoc, scrollLocApi] = useSpring(() => ({
    y: 0,
    reset: true,
  }))
  const scrollToBottom = () => {
    const content = document.getElementsByClassName('app-page')[0]

    if (!content) {
      return
    }

    scrollLocApi.start({
      y: content.scrollHeight,
      from: { y: content.scrollTop },
      onRest: props => {
        content.scrollTop = props.value.y
      }
    })
  }

  return (
    // @ts-ignore scrollTop is a thing for animated divs
    <animated.div id="content" scrollTop={scrollLoc.y}>
      <div className="component-container">
        <div className="content__main">
          <div>
            <h1>Content</h1>
            <p>Add your Resume Content</p>
            <div className="content__elements">
              {transitions((styleProps, item, t, index: number)=> {
                return (
                  <animated.div key={item.id} style={styleProps}>
                    <Section section={item} index={index} />
                  </animated.div>
                )
              })}
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