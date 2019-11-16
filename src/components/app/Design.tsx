import React, { useContext, useRef } from 'react'
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

const Design = () => {
  const { sections, header } = useContext(AppContext)
  const frame = useRef<HTMLIFrameElement>(null)

  const updateFrame = () => {
    // const template = new Cluo()
    const template = new Teres()
    // const template = new Cogito()
    const document = template.render(
      sections,
      header
    )
    const pdf = pdfMake.createPdf(document)
    pdf.getDataUrl((dataUrl: string) => {
      if (frame) {
        frame.current.src = dataUrl
      }
    })
  }
  return (
    <div>
      <h1>Design</h1>
      <p>{JSON.stringify(sections)}</p>
      <button onClick={updateFrame}>Update</button>
      <iframe ref={frame} style={{ width: '500px', height: '500px' }}/>
    </div>
  )
}

export default Design