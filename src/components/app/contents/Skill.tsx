import React, { ChangeEvent, useContext }  from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../../contexts/AppContext'
import { Skill as SkillType } from '../ResumeTypes'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'

const Skill = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const addSkillElement = () => {
    const skill: SkillType = {
      name: '',
      levels: [true, false, false, false, false],
      id: UUID()
    }
    updateSection(props.index, { ...props.skill, elements: [...props.skill.elements, skill]})
  }
  const deleteSkillElement = (index: number) => {
    const elements = props.skill.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.skill, elements })
  }
  const updateSkillElement = (index: number, value: Partial<SkillType>) => {
    const elements = props.skill.elements
      .map((skill, skillIndex) => skillIndex === index ? {...skill, ...value } : skill)
    updateSection(props.index, { ...props.skill, elements })
  }
  const updateSkillLevels = (index: number, levelIndex: number) => {
    const levels = props.skill.elements[index].levels
      .map((level, lvIndex) => lvIndex <= levelIndex ? true : false)
    updateSkillElement(index, { levels })
  }

  // Transitions
  const transitions = useTransition(props.skill.elements, item => item.id, {
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
            <div className="content__el content--skill">
              <div className="input">
                <label>Skill</label>
                <input
                  name="name"
                  placeholder="Skill"
                  value={item.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateSkillElement(index, { name: e.target.value })
                  }}
                />
              </div>
              <div className="skill__list">
                {item.levels.map((level, levelIndex) => {
                  return (
                    <div
                      key={levelIndex}
                      className={`skill__el ${level ? 'skill__el--selected' : ''}`}
                      onClick={() => updateSkillLevels(index, levelIndex)}
                    />
                  )
                })}
              </div>
            </div>
            <ContentActions
              section={props.skill}
              sectionIndex={props.index}
              index={index}
              reorder={reorderSectionEl}
              remove={deleteSkillElement}
            />
          </animated.div>
        )
      })}
      <ContentAdd add={addSkillElement} />
    </div>
  )
}

export default Skill