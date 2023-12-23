import { useState, type ChangeEvent, type KeyboardEvent } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { Contact as ContactType } from '../ResumeTypes'
import { shrinkTransitionConfig } from '../helpers/springs'

const defaultContacts = [
  'Telefoonnummer', 'E-mailadres', 'LinkedIn'
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
         <div className="header__contact">
      <h3>Contactgegevens</h3>
      <br></br>
      <p>Hoe kunnen werkgevers jou bereiken?<br></br><br></br>
     Selecteer een categorie of maak er zelf een aan.</p>
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
              <button className="btn__app-icon delete" style={{ marginBottom: '0.35rem' }} onClick={() => props.deleteContact(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
                  <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="currentColor"></path>
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
                  placeholder="Categorie maken"
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
              <button className="btn" onClick={addCustomContact}>Toevoegen</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact