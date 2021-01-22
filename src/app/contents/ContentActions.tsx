import React from 'react'
import { Section } from '../ResumeTypes'
import { ReorderSectionEl } from '../../contexts/AppContext'

interface Props {
  section: Section
  sectionIndex: number
  index: number
  reorder: ReorderSectionEl
  remove: (index: number) => void
}

const ContentActions: React.FC<Props> = ({ section, sectionIndex, index, reorder, remove }) => {
  return (
    <div className="content__el--actions">
      <button
        disabled={index === 0}
        className="btn btn-icon"
        onClick={() => reorder(section, sectionIndex, index, index - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      <button className="btn btn-icon icon__delete" onClick={() => remove(index)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </button>
      <button
        disabled={index === section.elements.length - 1}
        className="btn btn-icon"
        onClick={() => reorder(section, sectionIndex, index, index + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  )
}

export default ContentActions