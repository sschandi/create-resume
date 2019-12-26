import React, { createContext, useState } from 'react'
import Move from 'lodash-move'
import { Header, Section } from '../components/app/ResumeTypes'

type ContextProps = {
  header: Header
  updateHeader(payload: Partial<Header>): void
  sections: Section[]
  addSection(payload: Section): void
  updateSection(index: number, payload: Section): void
  deleteSection(index: number): void
  setSections(payload: Section[]): void
  reorderSection(curIndex: number, newIndex: number): void
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
    console.log('reordering')
    const moved = Move(sections, curIndex, newIndex)
    console.log(moved)
    setSections(moved)
  }

  return (
    <AppContext.Provider value={{ header, updateHeader, sections, addSection, updateSection, deleteSection, setSections, reorderSection }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider