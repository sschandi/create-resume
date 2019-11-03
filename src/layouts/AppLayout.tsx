import React from 'react'

const appLayout = ({ children }) => {
  return (
    <div className="app-layout" style={styles}>
      {children}
    </div>
  )
}

const styles = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

export default appLayout