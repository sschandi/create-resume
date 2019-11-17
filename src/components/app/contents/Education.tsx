import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'

const education = (props) => {
  const { updateSection, deleteSection } = useContext(AppContext)

  const deleteEducation = () => {
    deleteSection(props.index)
  }
  const updateEducationTitle = (title: string) => {
    updateSection(props.index, { ...props.education, title })
  }

  const addEducationElement = () => {
    const educationEl = {
      degree: '',
      program: '',
      university: '',
      date: ''
    }
    updateSection(props.index, { ...props.education, elements: [...props.education.elements, educationEl]})
  }
  const updateEducationElement = (index: string, name: string, value: string) => {
    const elements = props.education.elements
      .map((edu, eduIndex) => eduIndex === index ? { ...edu, [name]: value } : edu)
    updateSection(props.index, { ...props.education, elements })
  }
  const deleteEducationElement = (index: number) => {
    const elements = props.education.elements
      .filter((edu, eduIndex) => eduIndex !== index)
    updateSection(props.index, { ...props.education, elements })
  }

  return (
    <div>
      <input
        name="title"
        placeholder="Title"
        value={props.education.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          updateEducationTitle(e.target.value)
        }}
      />
      {props.education.elements.map((education, index) => {
        return (
          <div key={index}>
            <input
              name="degree"
              placeholder="Degree"
              value={education.degree}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateEducationElement(index, e.target.name, e.target.value)
              }}
            />
            <input
              name="program"
              placeholder="Program"
              value={education.program}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateEducationElement(index, e.target.name, e.target.value)
              }}
            />
            <input
              name="university"
              placeholder="University"
              value={education.university}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateEducationElement(index, e.target.name, e.target.value)
              }}
            />
            <input
              name="date"
              placeholder="Date"
              value={education.date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateEducationElement(index, e.target.name, e.target.value)
              }}
            />
            <button onClick={() => deleteEducationElement(index)}>Delete</button>
          </div>
        )
      })}
      <button onClick={() => addEducationElement()}>Add</button>
      <button onClick={() => deleteEducation()}>Delete</button>
    </div>
  )
}

export default education