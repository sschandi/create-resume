import React, { createContext, useState, useEffect } from 'react'
import Move from 'lodash-move'
import { Header, Section } from '../components/app/ResumeTypes'
import { templateList } from '../components/app/templates/Renderer'

type ContextProps = {
  header: Header
  updateHeader(payload: Partial<Header>): void
  sections: Section[]
  addSection(payload: Section): void
  updateSection(index: number, payload: Section): void
  deleteSection(index: number): void
  setSections(payload: Section[]): void
  reorderSection(curIndex: number, newIndex: number): void
  reorderSectionEl(section: Section, sectionIndex: number, curIndex: number, newIndex: number): void
  activeTemplate
  setTemplate(name: string): void
}

export const AppContext = createContext<Partial<ContextProps>>({})

const AppContextProvider = ({ children }) => {

  const [header, setHeader] = useState<Header>({
    name: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    contacts: [],
  })
  const updateHeader = (payload: Partial<Header>) => {
    setHeader({...header, ...payload})
  }

  const [sections, setSections] = useState<Section[]>([])
  const addSection = (payload: Section) => {
    setSections([...sections, payload])
  }
  const updateSection = (index, payload: Section) => {
    setSections(sections.map((section, secIndex) => secIndex === index ? payload : section))
  }
  const deleteSection = (index: number) => {
    setSections(sections.filter((section, secIndex) => secIndex !== index))
  }
  const reorderSection = (curIndex: number, newIndex: number) => {
    const moved = Move(sections, curIndex, newIndex)
    setSections(moved)
  }
  const reorderSectionEl = (section: Section, sectionIndex: number, curIndex: number, newIndex: number) => {
    const moved = Move(section.elements, curIndex, newIndex)
    const updated = Object.assign({}, section, { elements: moved })
    updateSection(sectionIndex, updated)
  }

  const [template, setTemplate] = useState(templateList[0].name)
  const [activeTemplate, setActiveTemplate] = useState(templateList[0])
  useEffect(() => {
    const found = templateList.find((temp) => temp.name === template)
    setActiveTemplate(found)
  }, [template])

  const [colours, setColours] = useState(null)

  return (
    <AppContext.Provider 
      value={{
        header,
        updateHeader,
        sections,
        addSection,
        updateSection,
        deleteSection,
        setSections,
        reorderSection,
        reorderSectionEl,
        activeTemplate,
        setTemplate
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider