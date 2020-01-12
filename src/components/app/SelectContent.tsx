import React, { useContext } from 'react'
import UUID from 'uuid/v4'
import { AppContext } from '../../contexts/AppContext'
import { SectionTypes } from './ResumeTypes'
import { useTrail, animated } from 'react-spring'

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
      { name: 'Your Skill', levels: [ true, true, true, true, false ] },
      { name: 'Your Skill', levels: [ true, true, true, false, false ] }
    ]
  },
  {
    type: SectionTypes.LIST,
    title: 'Experience',
    elements: [
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ],
      },
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ],
      }
    ],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'Volunteer',
    elements: [
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ],
      },
      {
        title: 'Reginal Manager', extra: '', elements: [
          'Directed staff.'
        ],
      }
    ],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'Projects',
    elements: [
      {
        title: 'My great project', extra: 'This is really neat', elements: [
          'Directed staff.'
        ],
      }
    ],
    date: false
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
        email: 'jimmy@company.com',
      }
    ]
  }
]

const customSelectOptions = [
  {
    type: SectionTypes.LIST,
    title: 'List with Date',
    elements: [{ title: '', extra: '', elements: [''] }],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'List with Subtitle',
    elements: [{ title: '', extra: '', elements: [''] }],
    date: false
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
      { name: '', levels: [ true, true, true, true, false ] },
      { name: 'Your Skill', levels: [ true, true, true, false, false ] }
    ]
  },
]

const SelectContent = ({ scrollToBottom }) => {
  const { addSection } = useContext(AppContext)
  const add = (section) => {
    // Create unique copy of elements instead of passing reference
    const sectionWithIdElements = section.elements.map((el) => ({ ...el, id: UUID() }))
    const sectionWithId = { ...section, id: UUID(), elements: sectionWithIdElements }
    addSection(sectionWithId)
    scrollToBottom()
  }

  const springOptions = useTrail(selectOptions.length, {
    config: { mass: 2, tension: 4000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 }
  })
  const springCustomOptions = useTrail(customSelectOptions.length, {
    config: { mass: 2, tension: 4000, friction: 200 },
    opacity: 1,
    from: { opacity: 0 }
  })

  return (
    <div className="content__select text--center">
      <h3>Add Content</h3>
      <div>
        {springOptions.map(({ ...rest }, index) => {
          return (
            <animated.button
              key={index}
              style={{ ...rest }}
              className="btn"
              onClick={() => add(selectOptions[index])}
            >
              {selectOptions[index].title}
            </animated.button>
          )
        })}
      </div>
      <h4>Custom Options</h4>
      <div>
      {springCustomOptions.map(({ ...rest }, index) => {
          return (
            <animated.button
              key={index}
              style={{ ...rest }}
              className="btn btn-primary"
              onClick={() => add(customSelectOptions[index])}
            >
              {customSelectOptions[index].title}
            </animated.button>
          )
        })}
      </div>
    </div>
  )
}

export default SelectContent