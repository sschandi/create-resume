import React, { createContext, useState } from 'react'
import { Header, Section } from '../components/app/ResumeTypes'

type ContextProps = {
  header: Header
  updateHeader(payload: Partial<Header>): void
  sections: Section[]
  addSection(payload: Section): void
  updateSection(index: number, payload: Section): void
  deleteSection(index: number): void
  setSections(payload: Section[]): void
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

  return (
    <AppContext.Provider value={{ header, updateHeader, sections, addSection, updateSection, deleteSection, setSections }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider