import { useCallback, useState } from 'react'

interface IUseLoading {
  loading: boolean
  loaded: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  start: () => void
  stop: () => void
}

const useLoading = (initial = false): IUseLoading => {

  const [loading, setLoading] = useState(initial)
  const [loaded, setLoaded] = useState(initial)

  const start = useCallback(() => { setLoading(true) }, [])

  const stop = useCallback(() => {
    setLoading(false)
    setLoaded(true)
  }, [])

  return {
    loading,
    loaded,
    setLoading,
    start,
    stop,
  }
}

export default useLoading
