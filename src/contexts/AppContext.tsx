import React, { createContext, useState } from 'react'

type ContextProps = {
  header: HeaderType
  updateHeader(payload: Partial<HeaderType>): void
  sections: Section[]
  addSection(payload: Section): void
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

  return (
    <AppContext.Provider value={{ header, updateHeader, sections, addSection }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider