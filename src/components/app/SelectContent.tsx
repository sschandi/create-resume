import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const selectOptions = [
  { type: 'text', title: 'Summary' },
  { type: 'education', title: 'Education' },
  { type: 'skill', title: 'Skills' },
  { type: 'list', title: 'Experience' },
  { type: 'list', title: 'Volunteer' },
  { type: 'reference', title: 'References' }
]

const customSelectOptions = [
  { type: 'list', title: 'List' },
  { type: 'text', title: 'Text' },
  { type: 'skill', title: 'Skill' },
]

const SelectContent = () => {
  const { } = useContext(AppContext)
  return (
    <div>
      <h1>Select Content</h1>
      <div>
        {selectOptions.map((option, index) => {
          return <button key={index}>{option.title}</button>
        })}
      </div>
      <div>
        <p>Custom Options</p>
        {customSelectOptions.map((option, index) => {
          return <button key={index}>{option.title}</button>
        })}
      </div>
    </div>
  )
}

export default SelectContent