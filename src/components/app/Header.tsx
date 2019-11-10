import React, { useContext, useState, ChangeEvent } from 'react'
import { AppContext } from '../../contexts/AppContext'
import Contact from './contents/Contact'

interface HeaderType {
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  contacts: Contact[]
}

interface Contact {
  name: string
  value: string
}

const Header = () => {
  const { header, updateHeader } = useContext(AppContext)

  const headerChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    updateHeader({ [e.target.name]: e.target.value })
  }

  const addToContact = (name: string, value: string = '') => {
    updateHeader({ contacts: [...header.contacts, { name, value }]})
  }

  const updateContact = (index: number, contact: Contact) => {
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
      <input
        type="text"
        name="name"
        placeholder="John Smith"
        value={header.name}
        onChange={headerChange}
      />
      <input
        type="text"
        name="address"
        placeholder="123 Sesame Street"
        value={header.address}
        onChange={headerChange}
      />
      <input
        type="text"
        name="city"
        placeholder="Vancouver"
        value={header.city}
        onChange={headerChange}
      />
      <input
        type="text"
        name="province"
        placeholder="British Columbia"
        value={header.province}
        onChange={headerChange}
      />
      <input
        type="text"
        name="postalCode"
        placeholder="1A2 B3C"
        value={header.postalCode}
        onChange={headerChange}
      />
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