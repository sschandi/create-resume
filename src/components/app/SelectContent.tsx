import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { SectionTypes } from './ResumeTypes'

const selectOptions = [
  {
    type: SectionTypes.TEXT,
    title: 'Summary',
    elements: [
      { elements: ['Summary Here'] }
    ]
  },
  {
    type: SectionTypes.EDUCATION,
    title: 'Education',
    elements: [
      { degree: '', program: '', university: '', date: '' }
    ]
  },
  {
    type: SectionTypes.SKILL,
    title: 'Skills',
    elements: [
      { name: 'Your Skill', levels: [ true, true, true, true, false ]},
      { name: 'Your Skill', levels: [ true, true, true, false, false ]}
    ]
  },
  {
    type: SectionTypes.LIST,
    title: 'Experience',
    elements: [
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ]
      },
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ]
      }
    ]
  },
  {
    type: SectionTypes.LIST,
    title: 'Volunteer',
    elements: [
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ]
      },
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ]
      }
    ]
  },
  {
    type: SectionTypes.REFERENCE,
    title: 'References',
    elements: [
      {
        name: 'John Smith',
        occupation: 'Sales',
        company: 'Washington',
        companyAddress: '123',
        phone: '(555) 123 - 4312',
        email: 'jimmy@company.com'
      }
    ]
  }
]

const customSelectOptions = [
  {
    type: SectionTypes.LIST,
    title: 'List',
    elements: [{ title: '', extra: '', elements: [''] }]
  },
  {
    type: SectionTypes.TEXT,
    title: 'Text',
    elements: [{ elements: [''] }]
  },
  {
    type: SectionTypes.SKILL,
    title: 'Skill',
    elements: [
      { name: '', levels: [ true, true, true, true, false ]},
      { name: 'Your Skill', levels: [ true, true, true, false, false ]}
    ]
  },
]

const SelectContent = () => {
  const { sections, addSection } = useContext(AppContext)

  return (
    <div>
      <h1>Select Content</h1>
      <div>
        {selectOptions.map((option, index) => {
          return (
            <button
              key={index}
              onClick={() => addSection({ type: option.type, title: option.title, elements: option.elements })}
            >
              {option.title}
            </button>
          )
        })}
      </div>
      <div>
        <p>Custom Options</p>
        {customSelectOptions.map((option, index) => {
          return (
            <button
              key={index}
              onClick={() => addSection({ type: option.type, title: option.title, elements: option.elements })}
            >
              {option.title}
            </button>
          )
        })}
      </div>
      {sections.map((section, index) => {
        return <div key={index}>{section.title}</div>
      })}
    </div>
  )
}

export default SelectContent