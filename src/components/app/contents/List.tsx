import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'

export interface List {
  title: string | null
  extra: string | null
  elements: string[]
}

const List = (props) => {
  const { updateSection, deleteSection } = useContext(AppContext)

  const updateList = (name: string, value: string) => {
    const list = Object.assign({}, props.list, { [name]: value })
    updateSection(props.index, list)
  }
  const deleteList = () => {
    deleteSection(props.index)
  }
  const updateListElement = (index: number, value: string) => {
    const elements = props.list.elements.map((el, elIndex) => elIndex === index ? value: el)
    updateSection(props.index, { ...props.list, elements })
  }
  const addListElement = () => {
    updateSection(props.index, { ...props.list, elements: [...props.list.elements, '']})
  }
  const deleteListElement = (index: number) => {
    const elements = props.list.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.list, elements })
  }

  return (
    <div>
      <input
        name="title"
        placeholder="Title"
        value={props.list.title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          updateList(e.target.name, e.target.value)
        }}
      />
      <input
        name="extra"
        placeholder="Extra"
        value={props.list.extra}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          updateList(e.target.name, e.target.value)
        }}
      />
      {props.list.elements.map((element, index) => {
        return (
          <div key={index}>
            <input
              name="element"
              placeholder={`${props.type} Element`}
              value={element}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault()
                updateListElement(index, e.target.value)
              }}
            />
            <button onClick={() => deleteListElement(index)}>Delete</button>
          </div>
        )
      })}
      <button onClick={() => addListElement()}>Add</button>
      <button onClick={() => deleteList()}>Delete</button>
    </div>
  )
}

export default List