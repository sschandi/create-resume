import { type ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../../contexts/AppContext'
import { Experience as ExperienceType, SectionEl } from '../ResumeTypes'
import BulletInput from './BulletInput'
import ResumeDateInput from './ResumeDateInput'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'
import { shrinkTransitionConfig } from '../helpers/springs'

interface Props {
  index: number
  experience: SectionEl<ExperienceType>
}

const Experience: React.FC<Props> = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const updateListElement = (index: number, value: Partial<ExperienceType>) => {
    const elements = props.experience.elements
      .map((el, elIndex) => elIndex === index ? { ...el, ...value } : el)
    updateSection(props.index, { ...props.experience, elements })
  }
  const addListElement = () => {
    const list: ExperienceType = {
      title: '',
      extra: '',
      company: '',
      elements: [''],
      id: UUID()
    }
    updateSection(props.index, { ...props.experience, elements: [...props.experience.elements, list]})
  }
  const deleteListElement = (index: number) => {
    const elements = props.experience.elements.filter((el, elIndex) => elIndex !== index)
    updateSection(props.index, { ...props.experience, elements })
  }

  // Transitions
  const transitions = useTransition(props.experience.elements, shrinkTransitionConfig)

  return (
    <div>
      {transitions((styleProps, item: ExperienceType, t, index: number) => {
        return (
          <animated.div key={item.id} style={styleProps} className="content__wrapper">
            <div className="content__el content--list">
              <div className="list__title">
                <div className="input list__input">
                  <label>Functietitel</label>
                  <input
                    name="title"
                    placeholder="Functietitel"
                    value={item.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault()
                      updateListElement(index, { title: e.target.value })
                    }}
                  />
                </div>
                <div className="list__extra">
                  <ResumeDateInput
                    value={item.extra}
                    label="Datum"
                    onChange={(extra) => updateListElement(index, { extra })}
                  />
                </div>
                <div className="list__extra">
                  <div className="input">
                    <label>Bedrijfsnaam</label>
                    <input
                      name="company"
                      placeholder="Bedrijfsnaam"
                      value={item.company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        updateListElement(index, { company: e.target.value })
                      }}
                    />
                  </div>
                </div>
              </div>
              <BulletInput
                value={item.elements}
                placeholder="Functieomschrijving"
                onChange={(elements) => updateListElement(index, { elements })}
              />
            </div>
            <ContentActions
              section={props.experience}
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

export default Experience