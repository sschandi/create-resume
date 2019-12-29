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
      <p>How do you want to be reached?</p>
      <div className="header__contact">
        {props.contacts.map((contact, index) => {
          return (
            <div key={index} className="header__contact--container">
              <div className="input type">
                <label>Contact</label>
                <input
                  value={contact.name}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    updateContactName(index, e.target.value)
                  }}
                />
              </div>
              <div className="input value">
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
        <div className="header__contact--actions">
          {defaultContacts.map((contact, index) => {
            return <button key={index} className="btn btn-primary" onClick={() => props.addToContact(contact)}>{contact}</button>
          })}
          <button className="btn" onClick={() => props.addToContact('')}>Custom</button>
        </div>
      </div>
    </div>
  )
}

export default Contact