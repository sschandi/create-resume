import { useContext, memo, type ChangeEvent } from 'react'
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
      <h3>Persoonlijke informatie</h3>
      <p></p>
      <div className="header__personal">
        <div className="input name">
          <label htmlFor="name">Naam</label>
          <input
            value={header.name}
            type="text"
            name="name"
            placeholder="Volledige naam"
            onChange={headerChange}
          />
        </div>
        <div className="input address">
          <label htmlFor="address">Adres</label>
          <input
            value={header.address}
            type="text"
            name="address"
            placeholder="Straatnaam + huisnummer"
            onChange={headerChange}
          />
        </div>
        <div className="input city">
          <label htmlFor="city">Woonplaats</label>
          <input
            value={header.city}
            type="text"
            name="city"
            placeholder="Woonplaats"
            onChange={headerChange}
          />
        </div>
        <div className="input postal">
          <label htmlFor="postalCode">Postcode</label>
          <input
            value={header.postalCode}
            type="text"
            name="postalCode"
            placeholder="Postcode"
            onChange={headerChange}
          />
        </div>
        <div className="input province">
          <label htmlFor="province">Provincie</label>
          <input
            value={header.province}
            type="text"
            name="province"
            placeholder="Provincie"
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

export default memo(Header)