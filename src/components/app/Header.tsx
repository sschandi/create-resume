import React, { useContext, useState, ChangeEvent } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { Contact as ContactType } from './ResumeTypes'
import Contact from './contents/Contact'

const Header = () => {
  const { header, updateHeader } = useContext(AppContext)

  const headerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    updateHeader({ [e.target.name]: e.target.value })
  }

  const addToContact = (name: string, value: string = '') => {
    updateHeader({ contacts: [...header.contacts, { name, value }]})
  }

  const updateContact = (index: number, contact: ContactType) => {
    const contacts = header.contacts.map((val, valIndex) => valIndex === index ? contact : val)
    updateHeader({ contacts })
  }

  const deleteContact = (index: number) => {
    updateHeader({ contacts: header.contacts.filter((contact, contactIndex) => contactIndex !== index) })
  }

  return (
    <div>
      <h1>Header</h1>
      <p>Lets start off with the easy stuff.</p>
      <div className="input">
        <label htmlFor="name">Name</label>
        <input
          value={header.name}
          type="text"
          name="name"
          placeholder="John Smith"
          autoFocus
          onChange={headerChange}
        />
      </div>
      <div className="input">
        <label htmlFor="address">Address</label>
        <input
          value={header.address}
          type="text"
          name="address"
          placeholder="123 Sesame Street"
          onChange={headerChange}
        />
      </div>
      <div className="input">
        <label htmlFor="city">City</label>
        <input
          value={header.city}
          type="text"
          name="city"
          placeholder="Vancouver"
          onChange={headerChange}
        />
      </div>
      <div className="input">
        <label htmlFor="province">Province</label>
        <input
          value={header.province}
          type="text"
          name="province"
          placeholder="British Columbia"
          onChange={headerChange}
        />
      </div>
      <div className="input">
        <label htmlFor="postalCode">Postal Code/Zip Code</label>
        <input
          value={header.postalCode}
          type="text"
          name="postalCode"
          placeholder="1A2 B3C"
          onChange={headerChange}
        />
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