import React, { createContext, useState } from 'react'

type ContextProps = {
  testing: string
  setApp?: any
}

enum AppComponents {
  Home = 1,
  Header,
  SelectContent,
  Content,
  AdditionalContent,
  Arrangement,
  Design,
  Colors,
  Export
}

export const AppContext = createContext<Partial<ContextProps>>({})

const AppContextProvider = ({ children }) => {
  const [app, setApp] = useState<ContextProps>({
    testing: 'Hello World'
  })
  return (
    <AppContext.Provider value={{ ...app, setApp }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider