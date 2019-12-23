import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { List as ListType } from '../ResumeTypes'
import BulletInput from './BulletInput'

const List = (props) => {
  const { updateSection, deleteSection } = useContext(AppContext)

  const updateList = (name: string, value: string) => {
    const list = Object.assign({}, props.list, { [name]: value })
    updateSection(props.index, list)
  }
  const deleteList = () => {
    deleteSection(props.index)
  }
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
    <div className="content">
      <div className="content__title">
        <div className="input">
          <input
            name="title"
            placeholder="Title"
            value={props.list.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              updateList(e.target.name, e.target.value)
            }}
          />
        </div>
      </div>
      {props.list.elements.map((element, index) => {
        return (
          <div key={index} className="content__wrapper">
            <div className="content__el content--list">
              <div className="list__title">
                <div className="input">
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
                <div className="input">
                  <label>{display()} Extra</label>
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
              </div>
              <BulletInput
                value={element.elements}
                placeholder={`${display()} Bullets`}
                onChange={(elements) => updateListElement(index, { elements })}
              />
            </div>
              <div className="content__el--actions">
                <button onClick={() => deleteListElement(index)}>Delete</button>
              </div>
          </div>
        )
      })}
      <button onClick={() => addListElement()}>Add</button>
      <button onClick={() => deleteList()}>Delete</button>
    </div>
  )
}

export default List