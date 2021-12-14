import { useCallback, useEffect, useState } from 'react'

const useScrollOffset = (offset: number): boolean => {
  const [achieved, setAchieved] = useState(false)

  const toggleClass = useCallback(() => {
    setAchieved(window.scrollY >= offset)
  }, [offset])

  useEffect(() => {
    document.addEventListener('scroll', toggleClass)
    return (): void => {
      if (document) document.removeEventListener('scroll', toggleClass)
    }
  }, [])

  return achieved
}

export default useScrollOffset