import React, { ChangeEvent } from 'react'
import { useTransition, animated } from 'react-spring'

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

  // Transitions
  const transitions = useTransition(props.contacts, item => item.id, {
    from: { transform: 'translate3d(0,20px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-20px,0)', opacity: 0 },
    config: { mass: 1, tension: 140, friction: 20 }
  })

  return (
    <div>
      <h2>Contact Info</h2>
      <p>How can employers reach you?</p>
      <div className="header__contact">
        {transitions.map(({ item, ...rest }, index) => {
          return (
            <animated.div key={item.id} style={rest.props} className="header__contact--container">
              <div className="input type">
                <label>Contact</label>
                <input
                  value={item.name}
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
                  value={item.value}
                  type="text"
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
          <button className="btn" onClick={() => props.addToContact('')}>Custom</button>
        </div>
      </div>
    </div>
  )
}

export default Contact