import React, { useContext, useRef } from 'react'
import { AppContext } from '../../contexts/AppContext'
import PDFJS from 'pdfjs-dist'

const Uploader = () => {
  const { updateHeader, setSections } = useContext(AppContext);
  const input = useRef(null)

  const uploadPDF = (e: any) => {
    const reader = new FileReader()
    reader.onload = loadPDF
    reader.readAsArrayBuffer(e.target.files[0])
  }

  const loadPDF = (e: any) => {
    const array = new Uint8Array(e.target.result)
    const loadingTask = PDFJS.getDocument(array)

    loadingTask.promise.then((doc) => {
      doc.getMetadata().then((data) => {
        if (!data || !data.info || !data.info.Custom || !data.info.Custom.serialized) {
          console.log('No custom info')
          return
        }
        try {
          const obj = JSON.parse(data.info.Custom.serialized)

          updateHeader(obj.header)
          setSections(obj.sections)
        } catch (e) {
          console.log('Failed parsing')
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
    </div>
  )
}

export default Uploader