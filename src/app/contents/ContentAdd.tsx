import React from 'react'

const ContentAdd = ({ add }) => {
  return (
    <div className="content__add">
      <button className="btn btn-icon icon__add" onClick={add}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </button>
    </div>
  )
}

export default ContentAdd