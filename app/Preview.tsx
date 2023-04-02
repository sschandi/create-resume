import { useContext, useState, useEffect, useCallback } from 'react'
import { animated, useSpring } from '@react-spring/web'
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

  const [expand, setExpand] = useState(false)
  const spring = useSpring({ scale: expand ? 2 : 1 })
  // Reverse the scaling applied to btn
  const btnSpring = useSpring({ scale: expand ? 0.5 : 1, x: expand ? '25%' : '0%', y: expand ? '-25%' : '0%' })

  return (
    <animated.div style={spring} className="app-preview__content">
      <animated.button style={btnSpring} type="button" className="btn preview-btn" onClick={() => setExpand((c) => !c)}>
        {!expand ?
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
            <path xmlns="http://www.w3.org/2000/svg" d="M17 2C16.4477 2 16 2.44772 16 3C16 3.55228 16.4477 4 17 4L18.5858 4L14.2929 8.29289C13.9024 8.68342 13.9024 9.31658 14.2929 9.70711C14.6834 10.0976 15.3166 10.0976 15.7071 9.70711L20 5.41422L20 7.00001C20 7.55229 20.4477 8 21 8C21.5523 8 22 7.55229 22 7L22 3C22 2.44772 21.5523 2 21 2H17ZM4 18.5858L4 17C4 16.4477 3.55228 16 3 16C2.44771 16 2 16.4477 2 17L2 21C2 21.5523 2.44772 22 3 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55229 20 7 20H5.41421L9.70711 15.7071C10.0976 15.3166 10.0976 14.6834 9.70711 14.2929C9.31658 13.9024 8.68342 13.9024 8.29289 14.2929L4 18.5858Z" fill="currentColor"></path>
          </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
            <path xmlns="http://www.w3.org/2000/svg" d="M21.7071 3.70711C22.0976 3.31658 22.0976 2.68342 21.7071 2.29289C21.3166 1.90237 20.6834 1.90237 20.2929 2.29289L16 6.58579L16 4.99999C16 4.44771 15.5523 3.99999 15 4C14.4477 4 14 4.44771 14 5L14 9C14 9.55228 14.4477 10 15 10L19 10C19.5523 10 20 9.55228 20 9C20 8.44772 19.5523 8 19 8L17.4142 8L21.7071 3.70711ZM2.29289 21.7071C1.90237 21.3166 1.90237 20.6834 2.29289 20.2929L6.58579 16H5C4.44772 16 4 15.5523 4 15C4 14.4477 4.44772 14 5 14H9C9.55228 14 10 14.4477 10 15L10 19C10 19.5523 9.55229 20 9 20C8.44772 20 8 19.5523 8 19L8 17.4142L3.70711 21.7071C3.31658 22.0976 2.68342 22.0976 2.29289 21.7071Z" fill="currentColor"></path>
          </svg>
        }
      </animated.button>
      <PDFDisplay document={document} loading={loading} />
    </animated.div>
  )
}

export default Preview
