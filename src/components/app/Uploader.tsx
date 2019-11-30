import React, { ChangeEvent, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const Uploader = () => {
  const { updateHeader, setSections } = useContext(AppContext);

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = loadJSON
    reader.readAsText(e.target.files[0])
  }

  const loadJSON = (e: any) => {
    try {
      const obj = JSON.parse(e.target.result)
      updateHeader(obj.header)
      setSections(obj.sections)
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  return (
    <div>
      <input type="file" id="load" onChange={upload} />
    </div>
  )
}

export default Uploader