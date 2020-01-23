import React, { useContext, ChangeEvent } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import List from './List'
import Text from './Text'
import Skill from './Skill'
import Education from './Education'
import Reference from './Reference'
import { SectionTypes } from '../ResumeTypes'

const Section = ({ section, index }) => {
  const { sections, updateSection, deleteSection, reorderSection } = useContext(AppContext)

  const updateSectionTitle = (title: string) => {
    const updated = Object.assign({}, section, { title })
    updateSection(index, updated)
  }

  const Component = () => {
    if (section.type === SectionTypes.LIST) {
      return <List list={section} index={index} />
    } else if (section.type === SectionTypes.TEXT) {
      return <Text text={section} index={index} />
    } else if (section.type === SectionTypes.SKILL) {
      return <Skill skill={section} index={index} />
    } else if (section.type === SectionTypes.EDUCATION) {
      return <Education education={section} index={index} />
    } else if (section.type === SectionTypes.REFERENCE) {
      return <Reference reference={section} index={index} />
    }
  }

  return (
    <div className="content">
      <div className="content__title" >
        <div className="input">
          <input
            name="title"
            placeholder="Title"
            value={section.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              updateSectionTitle(e.target.value)
            }}
          />
        </div>
        <div className="content__title--actions">
          <button className="btn btn-icon icon__delete" style={{ marginRight: '0.5rem' }} onClick={() => deleteSection(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </button>
          <div className="movable">
            <button
              disabled={index === 0}
              className="btn btn-icon"
              onClick={() => reorderSection(index, index - 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
            <button
              disabled={index === sections.length - 1}
              className="btn btn-icon"
              onClick={() => reorderSection(index, index + 1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {Component()}
    </div>
  )
}

export default Section