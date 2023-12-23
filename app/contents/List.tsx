import { type ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../../contexts/AppContext'
import { List as ListType, SectionEl } from '../ResumeTypes'
import BulletInput from './BulletInput'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'
import { shrinkTransitionConfig } from '../helpers/springs'

interface Props {
  index: number
  list: SectionEl<ListType>
}

const List: React.FC<Props> = (props) => {
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

  // Transitions
  const transitions = useTransition(props.list.elements, shrinkTransitionConfig)

  return (
    <div>
      {transitions((styleProps, item: ListType, t, index: number) => {
        return (
          <animated.div key={item.id} style={styleProps} className="content__wrapper">
            <div className="content__el content--list">
              {!props.list.simple &&
                <div className="list__title">
                  <div className="input list__input">
                    <label>Titel</label>
                    <input
                      name="title"
                      placeholder="Titel"
                      value={item.title || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        updateListElement(index, { title: e.target.value })
                      }}
                    />
                  </div>
                  <div className="list__extra">
                    {!props.list.date ?
                      <div className="input">
                        <label>Ondertitel</label>
                        <input
                          name="extra"
                          placeholder="Ondertitel"
                          value={item.extra || ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault()
                            updateListElement(index, { extra: e.target.value })
                          }}
                        />
                      </div>
                      :
                      <ResumeDateInput
                        value={item.extra || ''}
                        label="Datum"
                        onChange={(extra) => updateListElement(index, { extra })}
                      />
                    }
                  </div>
                </div>
              }
              <BulletInput
                value={item.elements}
                placeholder="Functieomschrijving"
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
      {!props.list.simple && <ContentAdd add={addListElement} />}
    </div>
  )
}

export default List