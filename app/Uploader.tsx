import React, { useContext, useState, useRef, ChangeEvent } from 'react'
import { AppContext } from '../contexts/AppContext'
import { pdfjs } from 'react-pdf'
import Modal from '../components/Modal'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Uploader: React.FC<{ next: () => void }> = ({ next }) => {
  const { updateHeader, setSections, setTemplate, setColors } = useContext(AppContext);
  const input = useRef(null)
  const [error, setError] = useState({ show: false, message: '' })

  const uploadPDF = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = loadPDF
    reader.readAsArrayBuffer(e.target.files[0])
  }

  const loadPDF = (e: any) => {
    const array = new Uint8Array(e.target.result)
    const loadingTask = pdfjs.getDocument(array)

    loadingTask.promise.then((doc) => {
      doc.getMetadata().then((data) => {
        if (!data || !data.info || !data.info.Custom || !data.info.Custom.serialized) {
          setError({ show: true, message: 'Sorry, this file was not made here :(' })
          return
        }
        try {
          const obj = JSON.parse(data.info.Custom.serialized)

          updateHeader(obj.header)
          setSections(obj.sections)
          setTemplate(obj.name)
          setColors(obj.colors)

          next()
        } catch (e) {
          setError({ show: true, message: 'Sorry, file data is corrupted :(' })
        }
      })
    })
  }

  return (
    <div>
      <input
        ref={input}
        type="file"
        id="pdfLoad"
        accept=".pdf"
        style={{ position: 'absolute', visibility: 'hidden', opacity: 0, width: '1px', height: '1px' }}
        onChange={uploadPDF}
      />
      <button
        className="btn btn-accent"
        onClick={() => input.current.click()}
      >
        Upload PDF
      </button>
      <Modal show={error.show} title="Error" close={() => setError({ show: false, message: '' })}>
        <div className="text--danger">
          <p>Unable to Process</p>
          <p>{error.message}</p>
        </div>
      </Modal>
    </div>
  )
}

export default Uploader