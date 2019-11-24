import React, { ChangeEvent } from 'react'

const defaultContacts = [
  'Phone', 'Email', 'Website'
]

const Contact = (props) => {
  const updateContactValue = (index: number, value) => {
    props.updateContact(index, { name: props.contacts[index].name, value })
  }

  const updateContactName = (index: number, name) => {
    props.updateContact(index, { name, value: props.contacts[index].value })
  }

  return (
    <div>
      <h2>Contact Info</h2>
      <div>
        {defaultContacts.map((contact, index) => {
          return <button key={index} onClick={() => props.addToContact(contact)}>{contact}</button>
        })}
        <button onClick={() => props.addToContact('')}>Custom</button>
      </div>
      {props.contacts.map((contact, index) => {
        return (
          <div key={index}>
            <div className="input">
              <label>Contact Type</label>
              <input
                value={contact.name}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  updateContactName(index, e.target.value)
                }}
              />
            </div>
            <div className="input">
              <label>Value</label>
              <input
                value={contact.value}
                type="text"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault()
                  updateContactValue(index, e.target.value)
                }}
              />
            </div>
            <button onClick={() => props.deleteContact(index)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Contact