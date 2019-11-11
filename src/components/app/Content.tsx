import React, { useContext } from 'react'
import { AppContext, SectionTypes } from '../../contexts/AppContext'
import List from './contents/List'

const Content = () => {
  const { sections } = useContext(AppContext)

  return (
    <div>
      <h1>Content</h1>
      <p>Now lets fill everything with Content</p>
      {/* Temp */}
      {JSON.stringify(sections, null, 2)}
      {sections.map((section, index) => {
        if (section.type === SectionTypes.LIST || section.type === SectionTypes.TEXT) {
          return <List key={index} type={section.type} list={section} index={index} />
        }
      })}
    </div>
  )
}

export default Content