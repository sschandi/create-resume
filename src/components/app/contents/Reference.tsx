import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'
import { Reference as ReferenceType } from '../ResumeTypes'

const Reference = (props) => {
  const { updateSection, deleteSection } = useContext(AppContext)

  const deleteReference = () => {
    deleteSection(props.index)
  }
  const updateReferenceTitle = (title: string) => {
    updateSection(props.index, { ...props.reference, title })
  }

  const addReferenceElement = () => {
    const referenceEl: ReferenceType = {
      name: '',
      occupation: '',
      company: '',
      companyAddress: '',
      phone: '',
      email: ''
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
    <div className="content">
      <div className="content__title">
        <div className="input">
          <input
            name="title"
            placeholder="Title"
            value={props.reference.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()
              updateReferenceTitle(e.target.value)
            }}
          />
        </div>
        <div className="content__title--actions">
          <button onClick={() => deleteReference()}>Delete</button>
        </div>
      </div>
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
            <div className="content__el--actions">
              <button onClick={() => deleteReferenceElement(index)}>Delete</button>
            </div>
          </div>
        )
      })}
      <button onClick={() => addReferenceElement()}>Add</button>
    </div>
  )
}

export default Reference