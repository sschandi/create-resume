import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { useTransition, animated } from 'react-spring'
import { AppContext } from '../../contexts/AppContext'
import { Reference as ReferenceType } from '../ResumeTypes'
import ContentActions from './ContentActions'
import ContentAdd from './ContentAdd'

const Reference = (props) => {
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
  const transitions = useTransition(props.reference.elements, item => item.id, {
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
            <div className="content__el content--reference">
              <div className="input">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  value={item.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Occupation</label>
                <input
                  name="occupation"
                  placeholder="Occupation"
                  value={item.occupation}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Company</label>
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
                <label>Address</label>
                <input
                  name="companyAddress"
                  placeholder="Company Address"
                  value={item.companyAddress}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateReferenceElement(index, e.target.name, e.target.value)
                  }}
                />
              </div>
              <div className="input">
                <label>Phone</label>
                <input
                  name="phone"
                  placeholder="Phone"
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