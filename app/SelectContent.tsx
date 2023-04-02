import React, { useContext } from 'react'
import UUID from 'uuid/v4'
import { AppContext } from '../contexts/AppContext'
import { Section, SectionTypes } from './ResumeTypes'
import { useTrail, animated } from '@react-spring/web'

type SectionNoId = Omit<Section, 'id'>

const selectOptions: SectionNoId[] = [
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
      { name: 'Excel', levels: [ true, true, true, true, false ] },
    ]
  },
  {
    type: SectionTypes.EXPERIENCE,
    title: 'Experience',
    elements: [
      {
        title: 'Sales', company: 'Generic Sales Co.', extra: 'Jan. 2010 - Aug. 2012', elements: [
          'Performed research study on product effectiveness by interviewing consumers and reviewing evaluation forms; findings helped manager to identify areas for improvement',
          'Resolved 25 client calls per day by responding to inquiries regarding credit card programs resulting in improved client relations and decreased complaints.'
        ],
      },
    ],
    date: true
  },
  {
    type: SectionTypes.EXPERIENCE,
    title: 'Volunteer',
    elements: [
      {
        title: 'Donations', company: 'Awesome Food Bank', extra: 'Jan. 2010 - Aug. 2012', elements: [
          'Collaborated with 12 colleagues to create and implement a charity food bank donation competition resulting in a 20% increase in donations.',
        ],
      },
    ],
    date: true
  },
  {
    type: SectionTypes.LIST,
    title: 'Projects',
    elements: [
      {
        title: 'My Great Project', extra: 'Subtitle', elements: [
          'Designed and implemented my great project to expedite sample collection, saving over $100,000 per year compared to manual collection.'
        ],
      }
    ],
    date: false
  },
  {
    type: SectionTypes.LIST,
    title: 'Achievements',
    elements: [
      {
        elements: ['Accumulated over 500 hours of volunteer service.', 'First place in Hackathon.']
      }
    ],
    simple: true,
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
        email: 'john@example.com',
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
    type: SectionTypes.LIST,
    title: 'List',
    elements: [{ title: '', extra: '', elements: [''] }],
    simple: true
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
  {
    type: SectionTypes.PAGEBREAK,
    title: 'Page Break',
    elements: [],
  }
]

const SelectContent: React.FC<{ scrollToBottom: () => void }> = ({ scrollToBottom }) => {
  const { addSection } = useContext(AppContext)
  const add = (section: SectionNoId) => {
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
    <div className="content__select">
      <h3>Add Content</h3>
      <div className="content__select--items">
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
      <div className="content__select--items">
      {springCustomOptions.map(({ ...rest }, index) => {
          return (
            <animated.button
              key={index}
              style={{ ...rest }}
              className="btn"
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