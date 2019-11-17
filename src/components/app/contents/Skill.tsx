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
    <div>
      <input
        name="title"
        placeholder="Title"
        value={props.skill.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          updateTitle(e.target.value)
        }}
      />
      {props.skill.elements.map((element, index) => {
        return (
          <div key={index}>
            <input
              name="name"
              placeholder="Skill"
              value={element.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateSkillElement(index, { name: e.target.value })
              }}
            />
            {element.levels.map((level, levelIndex) => {
              return (
                <div
                  key={levelIndex}
                  style={{width: '20px', height: '20px', backgroundColor: level ? 'red' : 'grey'}}
                  onClick={() => updateSkillLevels(index, levelIndex)}
                />
              )
            })}
            <button onClick={() => deleteSkillElement(index)}>Delete</button>
          </div>
        )
      })}
      <button onClick={() => addSkillElement()}>Add</button>
      <button onClick={() => deleteSkill()}>Delete</button>
    </div>
  )
}

export default Skill