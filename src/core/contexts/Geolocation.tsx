import React, { createContext, useState, useCallback, useEffect, useMemo } from 'react'

import { DEFAULT_POSITION } from 'core/consts'
// import fetchGeolocations from 'core/api/fetchGeolocations'
import useStorage from 'core/hooks/useStorage'

const Geolocation = createContext({} as IGeolocationContext)

interface IProps {
  geolocation: IGeolocationStatic
  canFetchGeolocation?: () => Promise<boolean>
}

interface ILocationStorage {
  location: ILocation
  ready: boolean
}

const STORAGE_KEY = 'geolocation'

const GeolocationProvider: React.FC<IProps> = ({ children, canFetchGeolocation, geolocation }) => {

  const { storage } = useStorage()

  const [ ready, setReady ] = useState(false)
  const [ location, setLocation ] = useState<ILocation>(DEFAULT_POSITION)

  const canFetch = useMemo(async () => (
    canFetchGeolocation === undefined
      ? true
      : canFetchGeolocation()
  ), [canFetchGeolocation])

  const fetchCurrectPosition = useCallback(async () => {
    if (!(await canFetch)) return
    geolocation.getCurrentPosition(
      ({ coords }) => {
        setReady(true)
        setLocation({ lat: coords.latitude, lng: coords.longitude })
      },
      (error) => {
        setReady(false)
        console.error(error)
      },
    )
  }, [canFetch, geolocation])

  const retrieveLocationFromStore = async (): Promise<void> => {
    const data = await storage.getItem<ILocationStorage>(STORAGE_KEY)
    if (!data) { return }
    setLocation(data.location)
  }

  useEffect(() => { retrieveLocationFromStore() }, [])

  const value: IGeolocationContext = {
    location,
    ready,
    fetchCurrectPosition,
  }

  return (
    <Geolocation.Provider value={value}>
      {children}
    </Geolocation.Provider>
  )
}

export { GeolocationProvider }

export default Geolocation