import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../../contexts/AppContext'
import { List as ListType } from '../ResumeTypes'
import BulletInput from './BulletInput'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'

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
      id: UUID()
    }
    updateSection(props.index, { ...props.list, elements: [...props.list.elements, list]})
  }
  const deleteListElement = (index: number) => {
    const elements = props.list.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.list, elements })
  }
  
  // Display for placeholder/labels
  const display = () => props.list.title ? props.list.title : 'List'

  // Transitions
  const transitions = useTransition(props.list.elements, item => item.id, {
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
                  {!props.list.date ?
                    <div className="input">
                      <label>Subtitle</label>
                      <input
                        name="extra"
                        placeholder="Subtitle"
                        value={item.extra}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          e.preventDefault()
                          updateListElement(index, { extra: e.target.value })
                        }}
                      />
                    </div>
                    :
                    <ResumeDateInput
                      value={item.extra}
                      label="Date"
                      onChange={(extra) => updateListElement(index, { extra })}
                    />
                  }
                </div>
              </div>
              <BulletInput
                value={item.elements}
                placeholder="Bullets"
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
          </animated.div>
        )
      })}
      <ContentAdd add={addListElement} />
    </div>
  )
}

export default List