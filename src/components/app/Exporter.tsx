import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const Exporter = () => {
  const { sections, header } = useContext(AppContext)

  const downloadJSON = () => {
    const fileName = `${header.name} - Create Resume`
    const exportObj = { sections, header }
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportObj))
    var node = document.createElement('a')
    node.setAttribute('href', dataStr)
    node.setAttribute('download', fileName + '.json')
    document.body.appendChild(node)
    node.click()
    node.remove()
  }

  return (
    <div className="component-container">
      <h1>Export</h1>
      <button onClick={() => downloadJSON()}>Export JSON</button>
    </div>
  )
}

export default Exporter