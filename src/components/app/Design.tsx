import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { Document, Page } from 'react-pdf'

const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('./templates/vfs_fonts')
pdfMake.vfs = pdfFonts
pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf'
  },
  OpenSans: {
    normal: 'OpenSans-Regular.ttf',
    bold: 'OpenSans-Bold.ttf',
    italics: 'OpenSans-Regular.ttf',
    bolditalics: 'OpenSans-Regular.ttf'
  },
  CrimsonText: {
    normal: 'CrimsonText-Regular.ttf',
    bold: 'CrimsonText-Bold.ttf',
    italics: 'CrimsonText-Regular.ttf',
    bolditalics: 'CrimsonText-Regular.ttf'
  },
  Quicksand: {
    normal: 'Quicksand-Regular.ttf',
    bold: 'Quicksand-Medium.ttf',
    italics: 'Quicksand-Regular.ttf',
    bolditalics: 'Quicksand-Regular.ttf'
  }
}
import Teres from './templates/Teres'
import Cluo from './templates/Cluo'
import Cogito from './templates/Cogito'

interface Template {
  id: number
  name: string
  document: object
  pdf: any
  template: any
}

const templateList = [Teres, Cluo, Cogito]

const Design = () => {
  const { sections, header } = useContext(AppContext)
  const [document, setDocument] = useState(null)

  const templates: Template[] = templateList.map((Template) => {
    const template = new Template()
    const document = template.render(sections, header)
    const pdf = pdfMake.createPdf(document)

    return {
      id: template.id,
      name: template.name,
      document,
      pdf,
      template: template
    }
  })
  const [activeTemplate, setActiveTemplate]= useState<Template>(templates[0])
  const [pageCount, setPageCount] = useState(0)
  const [currPage, setCurrPage] = useState(1)
  const onDocumentLoad = ({ numPages }) => {
    setPageCount(numPages)
  }
  const setPage = (action: 'prev' | 'next') => {
    if (action === 'prev' && currPage !== 1) {
      setCurrPage(currPage - 1)
    } else if (action === 'next' && currPage !== pageCount) {
      setCurrPage(currPage +1)
    }
  }

  useEffect(() => {
    const effectDocument = async () => {
      await activeTemplate.pdf.getDataUrl((url: string) => {
        setDocument(url)
      })
    }
    effectDocument()
  }, [activeTemplate])

  return (
    <div>
      <h1>Design</h1>
      <div className="pdf">
        <Document file={document} className="pdf-document" onLoadSuccess={onDocumentLoad}>
          <Page pageNumber={currPage} width={300} />
          <div style={{ position: 'absolute', top: 0 }}>
            <button onClick={() => setPage('prev')}>prev</button>
            <button onClick={() => setPage('next')}>Next</button>
          </div>
        </Document>
      </div>
      {templates.map((template) => {
        return <button key={template.id} onClick={() => setActiveTemplate(template)}>{template.name}</button>
      })}
    </div>
  )
}

export default Design