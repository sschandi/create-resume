import React, { useState, CSSProperties } from 'react'
import { useInView } from 'react-intersection-observer'

import ContentImage from '../../images/home/resume-content.inline.svg'

const SimpleContentImage = () => {
  const [ref, inView] = useInView({
    threshold: 0.7
  })
  const imageStyles: CSSProperties = {
    position: 'absolute',
    width: '50%',
    animation: 'simple-content 2s ease-in infinite forwards',
    animationPlayState: inView ? 'running' : 'paused',
    opacity: 0
  }

  return (
    <div ref={ref} style={{ position: 'relative', left: '0', overflow: 'hidden', height: '100%', width: '100%' }}>
      <div style={{ ...imageStyles, top: '0%' }}>
        <ContentImage />
      </div>
      <div style={{ ...imageStyles, top: '20%', animationDelay: '1s' }}>
        <ContentImage />
      </div>
      <div style={{ ...imageStyles, top: '35%', animationDelay: '0.7s' }}>
        <ContentImage />
      </div>
      <div style={{ ...imageStyles, top: '60%', animationDelay: '1.3s' }}>
        <ContentImage />
      </div>
    </div>
  )
}

export default SimpleContentImage
