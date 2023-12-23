import { useState, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  document: any
  loading: boolean
}

const PDFDisplay: React.FC<Props> = ({ document, loading }) => {
  const docRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(300)
  useEffect(() => {
    if (!docRef.current) {
      return
    }
    setWidth(docRef.current.clientWidth)
  }, [docRef])
  useEffect(() => {
    const handleResize = () => {
      if (!docRef.current) {
        return
      }
      setWidth(docRef.current.clientWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [pageCount, setPageCount] = useState(0)
  const [currPage, setCurrPage] = useState(1)

  const onDocumentLoad = ({ numPages }: { numPages: number }) => {
    setPageCount(numPages)
  }
  const setPage = (action: 'prev' | 'next') => {
    if (action === 'prev' && currPage !== 1) {
      setCurrPage(currPage - 1)
    } else if (action === 'next' && currPage !== pageCount) {
      setCurrPage(currPage +1)
    }
  }

  const loadingState = (
    <div className="pdf-document__loader">
      <h2>Laden</h2>
    </div>
  )

  return (
    <div className="pdf">
      <div ref={docRef} className="pdf-document" style={{ minHeight: `${width * 1.29}px`}}>
        {loading && loadingState}
        <Document file={document} loading={loadingState} noData={loadingState} onLoadSuccess={onDocumentLoad}>
          <Page pageNumber={currPage} width={width} />
        </Document>
        {pageCount > 1 ?
          <div className="pdf__pagination">
            <button
              disabled={currPage === 1}
              className="btn btn-compact"
              onClick={() => setPage('prev')}
            >
              Vorige
            </button>
            <button
              disabled={currPage === pageCount}
              className="btn btn-compact"
              onClick={() => setPage('next')}
            >
              Volgende
            </button>
          </div>
        : null}
      </div>
    </div>
  )
}

export default PDFDisplay