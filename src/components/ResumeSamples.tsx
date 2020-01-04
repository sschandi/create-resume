import React, { CSSProperties } from 'react'

import CluoImg from '../images/home/cluo-sample.png'
import CogitoImg from '../images/home/cogito-sample.png'
import TeresImg from '../images/home/teres-sample.png'

const imageStyles: CSSProperties = {
  position: 'absolute',
  height: '100%',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
}

const ResumeSamples = () => {
  return (
    <div style={containerStyles}>
      <img src={CluoImg} style={{ ...imageStyles, transform: 'rotate(-20deg) translateX(-30%)' }} />
      <img src={TeresImg} style={imageStyles} />
      <img src={CogitoImg} style={{ ...imageStyles, transform: 'rotate(20deg) translateX(40%)' }} />
    </div>
  )
}

export default ResumeSamples