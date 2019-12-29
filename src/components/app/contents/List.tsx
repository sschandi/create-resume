import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { List as ListType } from '../ResumeTypes'
import BulletInput from './BulletInput'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'

const List = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const updateListElement = (index: number, value: Partial<ListType>) => {
    const elements = props.list.elements
      .map((el, elIndex) => elIndex === index ? { ...el, ...value } : el)
    updateSection(props.index, { ...props.list, elements })
  }
  const addListElement = () => {
    const list: ListType = {
      title: '',
      extra: '',
      elements: [''],
    }
    updateSection(props.index, { ...props.list, elements: [...props.list.elements, list]})
  }
  const deleteListElement = (index: number) => {
    const elements = props.list.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.list, elements })
  }
  
  // Display for placeholder/labels
  const display = () => props.list.title ? props.list.title : 'List'

  return (
    <div>
      {props.list.elements.map((element, index) => {
        return (
          <div key={index} className="content__wrapper">
            <div className="content__el content--list">
              <div className="list__title">
                <div className="input list__input">
                  <label>{display()} Title</label>
                  <input
                    name="title"
                    placeholder="List Title"
                    value={element.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault()
                      updateListElement(index, { title: e.target.value })
                    }}
                  />
                </div>
                <div className="list__extra">
                  {!props.list.date ?
                    <div className="input">
                      <label>{display()} Subtitle</label>
                      <input
                        name="extra"
                        placeholder={`${display()} Extra`}
                        value={element.extra}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          e.preventDefault()
                          updateListElement(index, { extra: e.target.value })
                        }}
                      />
                    </div>
                    :
                    <ResumeDateInput
                      value={element.extra}
                      label={`${display()} Date`}
                      onChange={(extra) => updateListElement(index, { extra })}
                    />
                  }
                </div>
              </div>
              <BulletInput
                value={element.elements}
                placeholder={`${display()} Bullets`}
                onChange={(elements) => updateListElement(index, { elements })}
              />
            </div>
            <ContentActions
              section={props.list}
              sectionIndex={props.index}
              index={index}
              reorder={reorderSectionEl}
              remove={deleteListElement}
            />
          </div>
        )
      })}
      <button onClick={() => addListElement()}>Add</button>
    </div>
  )
}

export default List