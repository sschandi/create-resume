import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { AppContext } from '../../contexts/AppContext'
import { SectionTypes } from './ResumeTypes'
import SelectContent from './SelectContent'
import List from './contents/List'
import Skill from './contents/Skill'
import Education from './contents/Education'
import Reference from './contents/Reference'

const Content = ({ active, scrollTop }) => {
  const { sections } = useContext(AppContext)

  return (
    <div id="content" className="component-container">
      <div className="content__main">
        <h1>Content</h1>
        <p>Now lets fill everything with Content</p>
        {sections.map((section, index) => {
          if (section.type === SectionTypes.LIST || section.type === SectionTypes.TEXT) {
            return <List key={index} type={section.type} list={section} index={index} />
          } else if (section.type === SectionTypes.SKILL) {
            return <Skill key={index} skill={section} index={index} />
          } else if (section.type === SectionTypes.EDUCATION) {
            return <Education key={index} education={section} index={index} />
          } else if (section.type === SectionTypes.REFERENCE) {
            return <Reference key={index} reference={section} index={index} />
          }
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