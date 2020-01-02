import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../../contexts/AppContext'
import { Education as EducationType } from '../ResumeTypes'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'

const education = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const addEducationElement = () => {
    const educationEl: EducationType = {
      degree: '',
      program: '',
      university: '',
      date: '',
      id: UUID()
    }
    updateSection(props.index, { ...props.education, elements: [...props.education.elements, educationEl]})
  }
  const updateEducationElement = (index: number, name: string, value: string) => {
    const elements = props.education.elements
      .map((edu, eduIndex) => eduIndex === index ? { ...edu, [name]: value } : edu)
    updateSection(props.index, { ...props.education, elements })
  }
  const deleteEducationElement = (index: number) => {
    const elements = props.education.elements
      .filter((edu, eduIndex) => eduIndex !== index)
    updateSection(props.index, { ...props.education, elements })
  }

  // Transitions
  const transitions = useTransition(props.education.elements, item => item.id, {
    from: { transform: 'translate3d(0,20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    config: { mass: 1, tension: 140, friction: 20 }
  })

  return (
    <div>
      {transitions.map(({ item, ...rest }, index) => {
        return (
          <animated.div key={item.id} style={rest.props} className="content__wrapper">
            <div className="content__el content--education">
              <div className="input">
                <label>Degree</label>
                <input
                  name="degree"
                  placeholder="Degree"
                  value={item.degree}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateEducationElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Program</label>
                <input
                  name="program"
                  placeholder="Program"
                  value={item.program}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateEducationElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>University</label>
                <input
                  name="university"
                  placeholder="University"
                  value={item.university}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateEducationElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <ResumeDateInput
                value={item.date}
                label="Date"
                onChange={(value) => updateEducationElement(index, 'date', value)}
              />
            </div>
            <ContentActions
              section={props.education}
              sectionIndex={props.index}
              index={index}
              reorder={reorderSectionEl}
              remove={deleteEducationElement}
            />
          </animated.div>
        )
      })}
      <ContentAdd add={addEducationElement} />
    </div>
  )
}

export default education