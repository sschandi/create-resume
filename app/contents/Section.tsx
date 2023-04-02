import React, { useContext, ChangeEvent } from 'react'
import { AppContext } from '../../contexts/AppContext'
import List from './List'
import Experience from './Experience'
import Text from './Text'
import Skill from './Skill'
import Education from './Education'
import Reference from './Reference'
import { SectionTypes } from '../ResumeTypes'

interface Props {
  index: number
  section: any
}

const Section: React.FC<Props> = ({ section, index }) => {
  const { sections, updateSection, deleteSection, reorderSection } = useContext(AppContext)

  const updateSectionTitle = (title: string) => {
    const updated = Object.assign({}, section, { title })
    updateSection(index, updated)
  }

  const Component = () => {
    if (section.type === SectionTypes.LIST) {
      return <List list={section} index={index} />
    } else if (section.type === SectionTypes.EXPERIENCE) {
      return <Experience experience={section} index={index} />
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
        <div className={`input ${section.type === SectionTypes.PAGEBREAK && 'input__pagebreak'}`}>
          <input
            name="title"
            placeholder="Title"
            value={section.title}
            disabled={section.type === SectionTypes.PAGEBREAK}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              updateSectionTitle(e.target.value)
            }}
          />
        </div>
        <div className="content__title--actions">
          <button className="btn__app-icon delete" style={{ marginRight: '0.5rem' }} onClick={() => deleteSection(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
              <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="currentColor"></path>
            </svg>
          </button>
          <button
            disabled={index === 0}
            className="btn__app-icon"
            onClick={() => reorderSection(index, index - 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
          <button
            disabled={index === sections.length - 1}
            className="btn__app-icon"
            onClick={() => reorderSection(index, index + 1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      {Component()}
    </div>
  )
}

export default Section