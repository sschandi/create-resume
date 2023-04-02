import { useState, useEffect } from 'react'

const useWindowSize: () => { width: number, height: number } = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default useWindowSize