import React, { ChangeEvent, useContext } from 'react'
import UUID from 'uuid/v4'
import { AppContext } from '../../../contexts/AppContext'
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
  const updateReferenceElement = (index: string, name: string, value: string) => {
    const elements = props.reference.elements
      .map((edu, eduIndex) => eduIndex === index ? { ...edu, [name]: value } : edu)
    updateSection(props.index, { ...props.reference, elements })
  }
  const deleteReferenceElement = (index: number) => {
    const elements = props.reference.elements
      .filter((edu, eduIndex) => eduIndex !== index)
    updateSection(props.index, { ...props.reference, elements })
  }

  return (
    <div>
      {props.reference.elements.map((reference, index) => {
        return (
          <div key={index} className="content__wrapper">
            <div className="content__el content--reference">
              <div className="input">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  value={reference.name}
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
                  value={reference.occupation}
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
                  value={reference.company}
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
                  value={reference.companyAddress}
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
                  value={reference.phone}
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
                  value={reference.email}
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
          </div>
        )
      })}
      <ContentAdd add={addReferenceElement} />
    </div>
  )
}

export default Reference