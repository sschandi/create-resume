import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { SectionTypes } from './ResumeTypes'

const selectOptions = [
  { type: SectionTypes.TEXT, title: 'Summary' },
  { type: SectionTypes.EDUCATION, title: 'Education' },
  { type: SectionTypes.SKILL, title: 'Skills' },
  { type: SectionTypes.LIST, title: 'Experience' },
  { type: SectionTypes.LIST, title: 'Volunteer' },
  { type: SectionTypes.REFERENCE, title: 'References' }
]

const customSelectOptions = [
  { type: SectionTypes.LIST, title: 'List' },
  { type: SectionTypes.TEXT, title: 'Text' },
  { type: SectionTypes.SKILL, title: 'Skill' },
]

const SelectContent = () => {
  const { sections, addSection } = useContext(AppContext)

  return (
    <div>
      <h1>Select Content</h1>
      <div>
        {selectOptions.map((option, index) => {
          return <button key={index} onClick={() => addSection({ type: option.type, title: option.title, elements: []})}>{option.title}</button>
        })}
      </div>
      <div>
        <p>Custom Options</p>
        {customSelectOptions.map((option, index) => {
          return <button key={index} onClick={() => addSection({ type: option.type, title: option.title, elements: []})}>{option.title}</button>
        })}
      </div>
      {sections.map((section, index) => {
        return <div key={index}>{section.title}</div>
      })}
    </div>
  )
}

export default SelectContent