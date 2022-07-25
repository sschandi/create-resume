import React from 'react'

import CluoImg from '../../images/home/cluo-sample.png'
import CogitoImg from '../../images/home/cogito-sample.png'
import TeresImg from '../../images/home/teres-sample.png'

const ResumeSamples: React.FC = () => {
  return (
    <div className="resume-samples">
      <img src={CluoImg} className="resume-samples__img one" />
      <img src={TeresImg} className="resume-samples__img two" />
      <img src={CogitoImg} className="resume-samples__img three" />
    </div>
  )
}

export default ResumeSamples