import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../../contexts/AppContext'
import SelectContent from './SelectContent'
import Section from './contents/Section'

const Content = ({ active, scrollTop }) => {
  const { sections } = useContext(AppContext)

  return (
    <div id="content" className="component-container">
      <div className="content__main">
        <h1>Content</h1>
        <p>Now lets fill everything with Content</p>
        {sections.map((section, index) => {
          return <Section key={index} section={section} index={index} />
        })}
      </div>
      { active ? ReactDOM.createPortal(
        <div className="content__actions">
          <SelectContent />
        </div>,
        document.getElementById('app-layout')
      ) : null}
    </div>
  )
}

export default Content