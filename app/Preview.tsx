import { useContext, useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { AppContext } from '../contexts/AppContext'
import PDFDisplay from './PDFDisplay'

import { Section, Header } from './ResumeTypes'
import { Colors } from '../app/templates/Interfaces'
import { createPDF, TemplateOptions } from './templates/Renderer'

const Preview = () => {
  const { sections, header, activeTemplate, colors } = useContext(AppContext)
  const [document, setDocument] = useState(null)

  const [loading, setLoading] = useState(true)
  const effectDocument = async (sections: Section[], header: Header, colors: Colors | null, template: TemplateOptions) => {
    if (colors) {
      template.setColors(colors)
    } else {
      template.setColors(template.defaultColors)
    }
    const document = template.render(sections, header)
    const pdf = createPDF(document)
    await pdf.getDataUrl((url: string) => {
      // @ts-ignore currently no typing for pdf-make
      setDocument(url)
    })
  }
  const render = async (sections: Section[], header: Header, colors: Colors | null, template: TemplateOptions) => {
    setLoading(true)
    await effectDocument(sections, header, colors, template)
    setLoading(false)
  }
  const debounceRender = useCallback(debounce(render, 1000), [])
  useEffect(() => {
    debounceRender(sections, header, colors, activeTemplate)
  }, [sections, header, colors, activeTemplate])

  return (
    <PDFDisplay document={document} loading={loading} />
  )
}

export default Preview
