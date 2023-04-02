import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../../contexts/AppContext'
import { Education as EducationType, SectionEl } from '../ResumeTypes'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'
import { shrinkTransitionConfig } from '../helpers/springs'

interface Props {
  education: SectionEl<EducationType>
  index: number
}

const Education: React.FC<Props> = (props) => {
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
  const transitions = useTransition(props.education.elements, shrinkTransitionConfig)

  return (
    <div>
      {transitions((styleProps, item: EducationType, t, index: number) => {
        return (
          <animated.div key={item.id} style={styleProps} className="content__wrapper">
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
              <div className="input input--full">
                <label>Note (Optional)</label>
                <input
                  name="note"
                  placeholder="Note (Optional)"
                  value={item.note}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateEducationElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
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

export default Education