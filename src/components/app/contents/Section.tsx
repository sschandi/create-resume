import React, { useContext, ChangeEvent } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import List from './List'
import Text from './Text'
import Skill from './Skill'
import Education from './Education'
import Reference from './Reference'
import { SectionTypes } from '../ResumeTypes'

const Section = ({ section, index }) => {
  const { updateSection, deleteSection, reorderSection } = useContext(AppContext)

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
      <div className="content__title">
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
          <button onClick={() => reorderSection(index, index - 1)}>Up</button>
          <button onClick={() => deleteSection(index)}>Delete</button>
          <button onClick={() => reorderSection(index, index + 1)}>Down</button>
        </div>
      </div>
      {Component()}
    </div>
  )
}

export default Section