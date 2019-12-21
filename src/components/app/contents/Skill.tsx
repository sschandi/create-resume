import React, { ChangeEvent, useContext }  from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { Skill as SkillType } from '../ResumeTypes'

const Skill = (props) => {
  const { updateSection, deleteSection } = useContext(AppContext)

  const updateTitle = (title: string) => {
    const skill = Object.assign({}, props.skill, { title })
    updateSection(props.index, skill)
  }
  const deleteSkill = () => {
    deleteSection(props.index)
  }

  const addSkillElement = () => {
    const skill = {
      name: '',
      levels: [true, false, false, false, false]
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

  return (
    <div className="content">
      <div className="content__title">
        <div className="input">
          <input
            name="title"
            placeholder="Title"
            value={props.skill.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              updateTitle(e.target.value)
            }}
          />
        </div>
      </div>
      {props.skill.elements.map((element, index) => {
        return (
          <div key={index} className="content__wrapper">
            <div key={index} className="content__el content--skill">
              <div className="input">
                <label>Skill</label>
                <input
                  name="name"
                  placeholder="Skill"
                  value={element.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateSkillElement(index, { name: e.target.value })
                  }}
                />
              </div>
              <div className="skill__list">
                {element.levels.map((level, levelIndex) => {
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
            <div className="content__el--actions">
              <button onClick={() => deleteSkillElement(index)}>Delete</button>
            </div>
          </div>
        )
      })}
      <button onClick={() => addSkillElement()}>Add</button>
      <button onClick={() => deleteSkill()}>Delete</button>
    </div>
  )
}

export default Skill