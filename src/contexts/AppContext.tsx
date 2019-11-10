import React, { createContext, useState } from 'react'

type ContextProps = {
  header: HeaderType
  updateHeader(payload: Partial<HeaderType>): void
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

  return (
    <AppContext.Provider value={{ header, updateHeader }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider