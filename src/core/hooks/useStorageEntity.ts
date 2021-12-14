import React, { useEffect, useState, useRef } from 'react'

import useStorage from './useStorage'

export interface IUseStorageEntity<T> {
  data: T | null,
  set: React.Dispatch<React.SetStateAction<T | null>>,
}

export const RECENT_SERVICES_STORAGE_KEY = 'recent-search-services'
export const RECENT_SERVICES_LIMIT = 5

function useStorageEntity<T> (key: string): IUseStorageEntity<T> {

  const [data, setData] = useState<T | null>(null)
  const loadedRef = useRef(false)

  const { storage } = useStorage()

  useEffect(() => {
    storage.getItem<T>(key).then((result) => {
      loadedRef.current = true
      setData(result)
    })
  }, [])

  useEffect(() => {
    if (!loadedRef.current) { return }
    setData(data)
  }, [data])

  return { data, set: setData }
}

export default useStorageEntity