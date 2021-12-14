import { useCallback, useEffect, useState } from 'react'

const KEY = 'resize'

const useResizeHeight = (): boolean => {

  const [resized, setResized] = useState(false)
  const [initialHeight, setInitialHeight] = useState<number>(0)

  const onResize = useCallback(() => {
    if (window.innerHeight < initialHeight) {
      setResized(true)
    } else {
      setResized(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener(KEY, onResize)
    setInitialHeight(window.innerHeight)

    return (): void => {
      if (window) window.removeEventListener(KEY, onResize)
    }
  }, [])

  return resized
}

export default useResizeHeight
