import React from 'react'

const homeIcon = require('../../images/home.svg')
const userIcon = require('../../images/user.svg')
const listIcon = require('../../images/list.svg')
const brushIcon = require('../../images/brush.svg')

enum AppComponents {
  Home = 0,
  Header,
  Content,
  Design
}

const Navigation = ({ current, prev, next }) => {
  return (
    <div className="navigation">
      <img src={homeIcon} />
      <img src={userIcon} />
      <img src={listIcon} />
      <img src={brushIcon} />
      <button disabled={current === AppComponents.Home} onClick={prev}>Prev</button>
      <button disabled={current === AppComponents.Design} onClick={next}>Next</button>
    </div>
  )
}

export default Navigation
