import { useState, useContext, useEffect, memo } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { AppContext } from '../contexts/AppContext'
import { colorsList } from './templates/Renderer'

const SMALL_BREAKPOINT = 992

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

  const [ref, refSize] = useMeasure()
  const [width, setWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(width > SMALL_BREAKPOINT)
  const viewPalettes = width >= SMALL_BREAKPOINT
  const colorListSpring = useSpring({
    height: open ? refSize.height : 0,
    overflow: 'hidden',
  })
  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window
      setWidth(innerWidth)
      if (innerWidth < 992) {
        setOpen(false)
      } else {
        setOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="design-colors">
      <h3 className="colors__title">
        
        <span style={{ display: 'flex' }}>
          {colors ?
            <button className="btn btn-primary btn-compact" onClick={() => setColors(null)}>Standaard kleur</button> :
            <button className="btn btn-secondary btn-compact" disabled={true}>Standaard kleur</button>
          }
          {(!viewPalettes || !open) && <button className="btn btn-primary btn-compact" onClick={() => setOpen((open) => !open)}>
            {open ? 'Toepassen' : 'Kleurenpalet'}
          </button>}
        </span>
      </h3>
      <animated.div style={colorListSpring}>
        <div ref={ref} className="colors--wrapper">
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
      </animated.div>
    </div>
  )
}

export default memo(DesignColors)