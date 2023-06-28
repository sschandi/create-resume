const appLayout: React.FC<{ children: JSX.Element[]}> = ({ children }) => {
  return (
    <div id="app-layout" className="app-layout">
      {children}
    </div>
  )
}

export default appLayout