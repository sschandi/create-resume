import React from 'react'

const ContentActions = ({ section, sectionIndex, index, reorder, remove }) => {
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
      <button onClick={() => remove(index)}>Delete</button>
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