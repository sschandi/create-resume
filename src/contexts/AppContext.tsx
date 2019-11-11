import React, { createContext, useState } from 'react'

type ContextProps = {
  header: HeaderType
  updateHeader(payload: Partial<HeaderType>): void
  sections: Section[]
  addSection(payload: Section): void
  updateSection(index: number, payload: Section): void
  deleteSection(index: number)
}

interface HeaderType {
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  contacts: Contact[]
}

interface Contact {
  name: string
  value: string
}

interface Section {
  title: string
  type: string
  elements: any[] // swap any type to list of possible options
}

export enum SectionTypes {
  LIST = 'List',
  TEXT = 'Text',
  SKILL = 'Skill',
  EDUCATION = 'Education',
  REFERENCE = 'Reference'
}

export const AppContext = createContext<Partial<ContextProps>>({})

const AppContextProvider = ({ children }) => {

  const [header, setHeader] = useState<HeaderType>({
    name: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    contacts: [],
  })
  const updateHeader = (payload: Partial<HeaderType>) => {
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

  return (
    <AppContext.Provider value={{ header, updateHeader, sections, addSection, updateSection, deleteSection }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider