import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { SectionTypes } from '../ResumeTypes'
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
      elements: [''],
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
              {props.type !== SectionTypes.TEXT &&
                <div className="list__title">
                  <div className="input">
                    <label>{display()} Title</label>
                    <input
                      name="title"
                      placeholder={`${props.type} Title`}
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
              }
              {element.elements.map((listEl, listIndex) => {
                return (
                  <div className="input input__actionable" key={listIndex}>
                    <label>{display()} Text</label>
                    <textarea
                      name="element"
                      placeholder={`${display()} Text`}
                      value={listEl}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        e.preventDefault()
                        updateListElementText(index, listIndex, e.target.value)
                      }}
                    />
                    {props.type !== SectionTypes.TEXT &&
                      <div className="input__actions">
                        <button onClick={() => deleteListElementText(index, listIndex)}>Del</button>
                      </div>
                    }
                  </div>
                )
              })}
            </div>
              {props.type !== SectionTypes.TEXT &&
                <div className="content__el--actions">
                  <button onClick={() => addListElementText(index)}>Add El Text</button>
                  <button onClick={() => deleteListElement(index)}>Delete</button>
                </div>
              }
          </div>
        )
      })}
      {props.type !== SectionTypes.TEXT &&
        <button onClick={() => addListElement()}>Add</button>
      }
      <button onClick={() => deleteList()}>Delete</button>
    </div>
  )
}

export default List