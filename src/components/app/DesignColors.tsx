import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { colorsList } from './templates/Renderer'

const DesignColors = () => {
  const { colors, setColors } = useContext(AppContext)

  return (
    <div className="design-colors">
      <h3 className="colors__title">
        Colours
        {colors && <button className="btn btn-primary btn-compact" onClick={() => setColors(null)}>Use Default</button>}
      </h3>
      <div style={{ position: 'relative' }}>
        <div className="colors__outline" />
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