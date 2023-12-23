import { useContext, useState, useRef, type ChangeEvent } from 'react'
import { AppContext } from '../contexts/AppContext'
import { pdfjs } from 'react-pdf'
import Modal from '../components/Modal'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  next: () => void
  btnClasses?: string
  btnText?: string
}

const Uploader: React.FC<Props> = ({ next, btnClasses = 'btn', btnText = 'Upload CV(PDF)' }) => {
  const { updateHeader, setSections, setTemplate, setColors } = useContext(AppContext);
  const input = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState({ show: false, message: '' })

  const uploadPDF = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const reader = new FileReader()
    reader.onload = loadPDF
    reader.readAsArrayBuffer(e.target.files[0])
  }

  const clickUploadInput = () => {
    if (!input.current) {
      return
    }
    input.current.click()
  }

  const loadPDF = (e: any) => {
    const array = new Uint8Array(e.target.result)
    const loadingTask = pdfjs.getDocument(array)

    loadingTask.promise.then((doc: any) => {
      doc.getMetadata().then((data: any) => {
        if (!data || !data.info || !data.info.Custom || !data.info.Custom.serialized) {
          setError({ show: true, message: 'Sorry, alleen een cv dat hier is gemaakt kan opnieuw worden geüpload' })
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
          setError({ show: true, message: 'Fout, bestandsgegevens zijn beschadigd' })
        }
      })
    }).catch(() => {
      setError({ show: true, message: 'Fout bij lezen bestand' })
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
        className={btnClasses}
        onClick={clickUploadInput}
      >
        {btnText}
      </button>
      <Modal show={error.show} title="Error" close={() => setError({ show: false, message: '' })}>
        <div className="text--danger">
          <p>Kan verzoek niet verwerken</p>
          <p>{error.message}</p>
        </div>
      </Modal>
    </div>
  )
}

export default Uploader