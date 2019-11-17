import React, { ChangeEvent, useContext } from 'react'
import { AppContext, SectionTypes } from '../../../contexts/AppContext'
import { List as ListType } from '../ResumeTypes'

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
      title: props.type === SectionTypes.TEXT ? null : '',
      extra: props.type === SectionTypes.TEXT ? null : '',
      elements: [],
    }
    updateSection(props.index, { ...props.list, elements: [...props.list.elements, list]})
  }
  const deleteListElement = (index: number) => {
    const elements = props.list.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.list, elements })
  }

  const addListElementText = (index: number) => {
    const listTexts = [...props.list.elements[index].elements, '']
    updateListElement(index, { elements: listTexts })
  }
  const updateListElementText = (index: number, listIndex: number, value: string) => {
    const listTexts = props.list.elements[index].elements.map((el, elIndex) => elIndex === listIndex ? value : el);
    updateListElement(index, { elements: listTexts })
  }
  const deleteListElementText = (index: number, listIndex: number) => {
    const listTexts = props.list.elements[index].elements.filter((el, elIndex) => elIndex !== listIndex)
    updateListElement(index, { elements: listTexts })
  }

  let listHeader
  if (props.type === SectionTypes.TEXT) {
    
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
      {props.list.elements.map((element, index) => {
        return (
          <div key={index}>
            {props.type !== SectionTypes.TEXT &&
              <div>
                <input
                  name="title"
                  placeholder={`${props.type} Title`}
                  value={element.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateListElement(index, { title: e.target.value })
                  }}
                />
                <input
                  name="extra"
                  placeholder={`${props.type} Extra`}
                  value={element.extra}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateListElement(index, { extra: e.target.value })
                  }}
                />
              </div>
            }
            {element.elements.map((listEl, listIndex) => {
              return (
                <div key={listIndex}>
                  <input
                    name="element"
                    placeholder={`${props.type} Text`}
                    value={listEl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault()
                      updateListElementText(index, listIndex, e.target.value)
                    }}
                  />
                  <button onClick={() => deleteListElementText(index, listIndex)}>Delete El Text</button>
                </div>
              )
            })}
            <button onClick={() => addListElementText(index)}>Add El Text</button>
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