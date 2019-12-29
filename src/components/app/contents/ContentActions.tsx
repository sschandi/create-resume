import React from 'react'

const ContentActions = ({ section, sectionIndex, index, reorder, remove }) => {
  return (
    <div className="content__el--actions">
      <button
        disabled={index === 0}
        onClick={() => reorder(section, sectionIndex, index, index - 1)}
      >
        Up
      </button>
      <button onClick={() => remove(index)}>Delete</button>
      <button
        disabled={index === section.elements.length - 1}
        onClick={() => reorder(section, sectionIndex, index, index + 1)}
      >
        Down
      </button>
    </div>
  )
}

export default ContentActions