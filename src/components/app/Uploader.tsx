import React, { ChangeEvent } from 'react'

const Uploader = () => {
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = loadJSON
    reader.readAsText(e.target.files[0])
  }

  const loadJSON = (event: any) => {
    try {
      const obj = JSON.parse(event.target.result)
      console.log(obj)
    } catch {
      alert('Error Processing')
    }
  }

  return (
    <div>
      <input type="file" id="load" onChange={(e) => upload(e)} />
    </div>
  )
}

export default Uploader