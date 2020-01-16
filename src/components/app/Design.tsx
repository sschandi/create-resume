import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import PDFDisplay from './PDFDisplay'
import Modal from '../Modal'

import { createPDF, templateList } from './templates/Renderer'

const Design = ({ active }) => {
  const { sections, header } = useContext(AppContext)
  const [document, setDocument] = useState(null)

  const [activeTemplate, setActiveTemplate] = useState(templateList[0])
  const [showModal, setShowModal] = useState(false)
  const downloadActive = () => {
    const document = activeTemplate.render(sections, header)
    const pdf = createPDF(document)
    pdf.download(`Resume - ${header.name}.pdf`)
    setShowModal(true)
  }

  const [loading, setLoading] = useState(true)
  const effectDocument = async () => {
    const document = activeTemplate.render(sections, header)
    const pdf = createPDF(document)
    await pdf.getDataUrl((url: string) => {
      setDocument(url)
    })
  }
  useEffect(() => {
    if (!active) {
      return
    }
    setLoading(true)
    effectDocument()
    setLoading(false)
  }, [activeTemplate])
  useEffect(() => {
    if (!active) {
      return
    }
    setLoading(true)
    setTimeout(() => {
      effectDocument()
      setLoading(false)
    }, 1200)
  }, [active])

  return (
    <div id="design">
      <div className="component-container">
        <div className="design__title">
          <h1>Design</h1>
          <button className="btn btn-primary" onClick={downloadActive}>Get Resume</button>
        </div>
        <div className="design">
          <div className="design__preview">
            <PDFDisplay document={document} loading={loading} />
          </div>
          <div className="design__actions">
            <h3>Template</h3>
            {templateList.map((template) => {
              return (
                <button
                  key={template.name}
                  className={`btn ${activeTemplate.name === template.name ? 'btn-accent' : ''}`}
                  onClick={() => setActiveTemplate(template)}
                >
                  {template.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <Modal show={showModal} title="Enjoy your Resume" close={() => setShowModal(false)}>
        <div className="text--center">
          <p>If you need to make changes to this resume, you can re-upload the PDF to continue where you left off.</p>
          <p>Good luck!</p>
        </div>
      </Modal>
    </div>
  )
}

export default Design