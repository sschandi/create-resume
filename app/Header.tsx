import React, { useContext, ChangeEvent } from 'react'
import UUID from 'uuid/v4'
import { AppContext } from '../contexts/AppContext'
import { Contact as ContactType } from './ResumeTypes'
import Contact from './contents/Contact'

const Header: React.FC = () => {
  const { header, updateHeader } = useContext(AppContext)

  const headerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    updateHeader({ [e.target.name]: e.target.value })
  }

  const addToContact = (name: string, value = '') => {
    const newContact = {
      id: UUID(),
      name,
      value
    }
    updateHeader({ contacts: [...header.contacts, newContact ]})
  }

  const updateContact = (index: number, contact: ContactType) => {
    const contacts = header.contacts.map((val, valIndex) => valIndex === index ? contact : val)
    updateHeader({ contacts })
  }

  const deleteContact = (index: number) => {
    updateHeader({ contacts: header.contacts.filter((contact, contactIndex) => contactIndex !== index) })
  }

  return (
    <div className="component-container">
      <h1>Header</h1>
      <p>Lets start off with the easy stuff.</p>
      <div className="header__personal">
        <div className="input name">
          <label htmlFor="name">Name</label>
          <input
            value={header.name}
            type="text"
            name="name"
            placeholder="John Smith"
            onChange={headerChange}
          />
        </div>
        <div className="input address">
          <label htmlFor="address">Address</label>
          <input
            value={header.address}
            type="text"
            name="address"
            placeholder="123 Sesame Street"
            onChange={headerChange}
          />
        </div>
        <div className="input city">
          <label htmlFor="city">City</label>
          <input
            value={header.city}
            type="text"
            name="city"
            placeholder="Vancouver"
            onChange={headerChange}
          />
        </div>
        <div className="input province">
          <label htmlFor="province">Province / State</label>
          <input
            value={header.province}
            type="text"
            name="province"
            placeholder="BC"
            onChange={headerChange}
          />
        </div>
        <div className="input postal">
          <label htmlFor="postalCode">Postal / Zip Code</label>
          <input
            value={header.postalCode}
            type="text"
            name="postalCode"
            placeholder="1A2 B3C"
            onChange={headerChange}
          />
        </div>
      </div>
      <Contact
        contacts={header.contacts}
        addToContact={addToContact}
        updateContact={updateContact}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default Header