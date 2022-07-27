import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../../contexts/AppContext'
import { Experience as ExperienceType } from '../ResumeTypes'
import BulletInput from './BulletInput'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'

interface Props {
  index: number
  experience: any
}

const Experience: React.FC<Props> = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const updateListElement = (index: number, value: Partial<ExperienceType>) => {
    const elements = props.experience.elements
      .map((el, elIndex) => elIndex === index ? { ...el, ...value } : el)
    updateSection(props.index, { ...props.experience, elements })
  }
  const addListElement = () => {
    const list: ExperienceType = {
      title: '',
      extra: '',
      company: '',
      elements: [''],
      id: UUID()
    }
    updateSection(props.index, { ...props.experience, elements: [...props.experience.elements, list]})
  }
  const deleteListElement = (index: number) => {
    const elements = props.experience.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.experience, elements })
  }

  // Transitions
  const transitions = useTransition(props.experience.elements, {
    keys: item => item.id,
    from: { transform: 'translate3d(0,20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    config: { mass: 1, tension: 140, friction: 20 }
  })

  return (
    <div>
      {transitions((styleProps, item: ExperienceType, t, index: number) => {
        return (
          <animated.div key={item.id} style={styleProps} className="content__wrapper">
            <div className="content__el content--list">
              <div className="list__title">
                <div className="input list__input">
                  <label>Title</label>
                  <input
                    name="title"
                    placeholder="Title"
                    value={item.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault()
                      updateListElement(index, { title: e.target.value })
                    }}
                  />
                </div>
                <div className="list__extra">
                  <ResumeDateInput
                    value={item.extra}
                    label="Date"
                    onChange={(extra) => updateListElement(index, { extra })}
                  />
                </div>
                <div className="list__extra">
                  <div className="input">
                    <label>Company</label>
                    <input
                      name="company"
                      placeholder="Company"
                      value={item.company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        updateListElement(index, { company: e.target.value })
                      }}
                    />
                  </div>
                </div>
              </div>
              <BulletInput
                value={item.elements}
                placeholder="Bullets"
                onChange={(elements) => updateListElement(index, { elements })}
              />
            </div>
            <ContentActions
              section={props.experience}
              sectionIndex={props.index}
              index={index}
              reorder={reorderSectionEl}
              remove={deleteListElement}
            />
          </animated.div>
        )
      })}
      <ContentAdd add={addListElement} />
    </div>
  )
}

export default Experience