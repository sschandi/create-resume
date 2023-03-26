import React, { useContext, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext'
import { colorsList } from './templates/Renderer'
import { useSpring, animated, config } from '@react-spring/web'

const DesignColors: React.FC = () => {
  const { colors, setColors } = useContext(AppContext)
  const [spring, springApi] = useSpring(() => ({ opacity: 0, top: '0rem', config: config.stiff }))
  useEffect(() => {
    if (!colors) {
      springApi.start({ opacity: 0, top: '0rem' })
      return
    }
    const index = colorsList.findIndex((item) => {
      return JSON.stringify(item) === JSON.stringify(colors)
    })
    springApi.start({ opacity: 1, top: `${index * 3}rem` })
  }, [colors])

  return (
    <div className="design-colors">
      <h3 className="colors__title">
        Palette
        {colors ?
          <button className="btn btn-primary btn-compact" onClick={() => setColors(null)}>Use Default</button> :
          <button className="btn btn-secondary btn-compact" disabled={true}>Using Default</button>
        }
      </h3>
      <div className="colors--wrapper">
        <animated.div style={spring} className="colors__outline" />
        {colorsList.map((item, index) => {
          return (
            <div key={index} className="colors__container" onClick={() => setColors(item)}>
              <div style={{ backgroundColor: item.primary }} className="colors__box" />
              <div style={{ backgroundColor: item.secondary }} className="colors__box" />
              <div style={{ backgroundColor: item.accent }} className="colors__box" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DesignColors