import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'

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
  const frame = useRef<HTMLIFrameElement>(null)

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

  useEffect(() => {
    activeTemplate.pdf.getDataUrl((url: string) => {
      if (frame) {
        frame.current.src = url
      }
    })
  }, [activeTemplate])

  return (
    <div>
      <h1>Design</h1>
      <p>{JSON.stringify(sections)}</p>
      <iframe ref={frame} style={{ width: '700px', height: '700px' }} />
      {templates.map((template) => {
        return <button key={template.id} onClick={() => setActiveTemplate(template)}>{template.name}</button>
      })}
    </div>
  )
}

export default Design