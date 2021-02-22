import React, { useState } from 'react'
import Modal from '../components/Modal'
import { Section, Header, Contact } from './ResumeTypes'

interface Props {
  download: (sections: Section[], header: Header) => void
  sections: Section[]
  header: Header
}

const REDACTED = '<redacted>'

const AnonymousDownload: React.FC<Props> = ({ download, sections, header }) => {
  const [modal, setModal] = useState(false)

  const downloadAnonymous = () => {
    console.log(anonymizedSections(), anonymizedHeader())
    download(anonymizedSections(), anonymizedHeader())
  }

  const anonymizedHeader = () => {
    const anonHeader: Header = {
      name: 'Anonymous Person',
      address: '123 Sesame Street',
      city: 'City',
      province: 'Province',
      postalCode: 'Postal Code',
      contacts: header.contacts.map((contact: Contact) => ({ ...contact, value: REDACTED }))
    }
    
    return anonHeader
  }

  const anonymizedSections = () => {
    return sections
  }

  return(
    <div>
      <button className="btn btn-primary" style={{ width: '100%', margin: '1rem 0' }} onClick={() => setModal(true)}>Download Anonymous</button>
      <Modal show={modal} title="Anonymize Resume" close={() => setModal(false)}>
        <div>
          <p>Hello</p>
          <button className="btn btn-primary" onClick={downloadAnonymous}>Download Resume</button>
        </div>
      </Modal>
    </div>
  )
}

export default AnonymousDownload