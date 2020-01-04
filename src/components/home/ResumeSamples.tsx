import React, { CSSProperties } from 'react'

import CluoImg from '../../images/home/cluo-sample.png'
import CogitoImg from '../../images/home/cogito-sample.png'
import TeresImg from '../../images/home/teres-sample.png'

const imageStyles: CSSProperties = {
  position: 'absolute',
  height: '100%',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}

const ResumeSamples = () => {
  return (
    <div className="resume-samples">
      <img src={CluoImg} className="resume-samples__img one" />
      <img src={TeresImg} className="resume-samples__img two" />
      <img src={CogitoImg} className="resume-samples__img three" />
    </div>
  )
}

export default ResumeSamples