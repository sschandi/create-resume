import { type ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from '@react-spring/web'
import { AppContext } from '../../contexts/AppContext'
import { Reference as ReferenceType, SectionEl } from '../ResumeTypes'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'
import { shrinkTransitionConfig } from '../helpers/springs'

interface Props {
  index: number
  reference: SectionEl<ReferenceType>
}

const Reference: React.FC<Props> = (props) => {
  const { updateSection, reorderSectionEl } = useContext(AppContext)

  const addReferenceElement = () => {
    const referenceEl: ReferenceType = {
      name: '',
      occupation: '',
      company: '',
      companyAddress: '',
      phone: '',
      email: '',
      id: UUID()
    }
    updateSection(props.index, { ...props.reference, elements: [...props.reference.elements, referenceEl]})
  }
  const updateReferenceElement = (index: number, name: string, value: string) => {
    const elements = props.reference.elements
      .map((edu, eduIndex) => eduIndex === index ? { ...edu, [name]: value } : edu)
    updateSection(props.index, { ...props.reference, elements })
  }
  const deleteReferenceElement = (index: number) => {
    const elements = props.reference.elements
      .filter((edu, eduIndex) => eduIndex !== index)
    updateSection(props.index, { ...props.reference, elements })
  }

  // Transitions
  const transitions = useTransition(props.reference.elements, shrinkTransitionConfig)

  return (
    <div>
      {transitions((styleProps, item: ReferenceType, t, index: number) => {
        return (
          <animated.div key={item.id} style={styleProps} className="content__wrapper">
            <div className="content__el content--reference">
              <div className="input">
                <label>Naam</label>
                <input
                  name="name"
                  placeholder="Naam"
                  value={item.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Functietitel</label>
                <input
                  name="occupation"
                  placeholder="Functietitel"
                  value={item.occupation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Bedrijfsnaam</label>
                <input
                  name="company"
                  placeholder="Company"
                  value={item.company}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Bedrijfsadres</label>
                <input
                  name="companyAddress"
                  placeholder="Bedrijfsadres"
                  value={item.companyAddress}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Telefoonnummer</label>
                <input
                  name="phone"
                  placeholder="Telefoonnummer"
                  value={item.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Email</label>
                <input
                  name="email"
                  placeholder="Email"
                  value={item.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
            </div>
            <ContentActions
              section={props.reference}
              sectionIndex={props.index}
              index={index}
              reorder={reorderSectionEl}
              remove={deleteReferenceElement}
            />
          </animated.div>
        )
      })}
      <ContentAdd add={addReferenceElement} />
    </div>
  )
}

export default Reference