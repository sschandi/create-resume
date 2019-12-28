import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import PDFJS from 'pdfjs-dist'

const Uploader = () => {
  const { updateHeader, setSections } = useContext(AppContext);

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
        const obj = JSON.parse(data.info.Custom.serialized)
        console.log(obj)
        updateHeader(obj.header)
        setSections(obj.sections)
      })
    })
  }

  return (
    <div>
      <input type="file" id="pdfLoad" onChange={uploadPDF} />
    </div>
  )
}

export default Uploader