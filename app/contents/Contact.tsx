import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { Contact as ContactType } from '../ResumeTypes'
import { shrinkTransitionConfig } from '../helpers/springs'

const defaultContacts = [
  'Phone', 'Email', 'Website'
]

interface Props {
  contacts: ContactType[]
  addToContact: (name: string, value?: string) => void
  updateContact: (index: number, contact: ContactType) => void
  deleteContact: (index: number) => void
}

const Contact: React.FC<Props> = (props) => {
  const [customContact, setCustomContact] = useState<string>('')

  const addCustomContact = () => {
    if (!customContact) {
      return;
    }
    props.addToContact(customContact)
    setCustomContact('')
  }

  const updateContactValue = (index: number, value: string) => {
    const { name, id } = props.contacts[index]
    props.updateContact(index, { id, name, value })
  }

  // const updateContactName = (index: number, name) => {
  //   const { value, id } = props.contacts[index]
  //   props.updateContact(index, { id, name, value })
  // }

  // Transitions
  const transitions = useTransition(props.contacts, shrinkTransitionConfig)

  return (
    <div>
      <h2>Contact Info</h2>
      <p>How can employers reach you?</p>
      <div className="header__contact">
        {transitions((styleProps, item: ContactType, t, index: number) => {
          return (
            <animated.div key={item.id} style={styleProps} className="header__contact--container">
              <div className="input value">
                <label>{item.name}</label>
                <input
                  value={item.value}
                  type="text"
                  placeholder={item.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateContactValue(index, e.target.value)
                  }}
                />
              </div>
              <button className="btn btn-icon icon__delete" onClick={() => props.deleteContact(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </button>
            </animated.div>
          )
        })}
        <div className="header__contact--actions">
          {defaultContacts.map((contact, index) => {
            return <button key={index} className="btn btn-primary" onClick={() => props.addToContact(contact)}>{contact}</button>
          })}
          <div className="custom-contact">
            <div className="custom-contact--input">
              <div className="input">
                <input
                  value={customContact}
                  type="text"
                  placeholder="Custom (ex. Portfolio)"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    setCustomContact(e.target.value);
                  }}
                  onKeyPress={(e: KeyboardEvent) => {
                    if (e.key === 'Enter') {
                      addCustomContact()
                    }
                  }}
                />
              </div>
              <button className="btn" onClick={addCustomContact}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact