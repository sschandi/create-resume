import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'

const PDFDisplay = ({ document, width }) => {
  const [pageCount, setPageCount] = useState(0)
  const [currPage, setCurrPage] = useState(1)
  const onDocumentLoad = ({ numPages }) => {
    setPageCount(numPages)
  }
  const setPage = (action: 'prev' | 'next') => {
    if (action === 'prev' && currPage !== 1) {
      setCurrPage(currPage - 1)
    } else if (action === 'next' && currPage !== pageCount) {
      setCurrPage(currPage +1)
    }
  }

  return (
    <div className="pdf">
      <Document file={document} className="pdf-document" onLoadSuccess={onDocumentLoad}>
        <Page pageNumber={currPage} width={width} />
        <div style={{ position: 'absolute', top: 0 }}>
          <button onClick={() => setPage('prev')}>prev</button>
          <button onClick={() => setPage('next')}>Next</button>
        </div>
      </Document>
    </div>
  )
}

export default PDFDisplay