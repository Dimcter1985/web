import { useCallback, useContext, useEffect } from 'react'
import GeoPoint from 'geo-point'
import Geolocation from 'core/contexts/Geolocation'

export interface IUseGeolocation extends IGeolocationContext {
  getDestinaceToSalon: (location: ILocation) => number
}

interface IUseGeoLocationParams {
  fetchCoords?: boolean
}

const METERS_IN_MILES = 1609.3440057765

const useGeolocation = ({ fetchCoords = false }: IUseGeoLocationParams | undefined = {}): IUseGeolocation => {
  
  const { location: userLocation, fetchCurrectPosition, ...restContext } = useContext(Geolocation)

  const getDestinaceToSalon = useCallback((salonLocation: ILocation) => {
    const from = new GeoPoint(userLocation.lat, userLocation.lng)
    const to = new GeoPoint(salonLocation.lat, salonLocation.lng)
    return Number((from.calculateDistance(to) / METERS_IN_MILES).toFixed(1))
  }, [userLocation])

  useEffect(() => {
    if (fetchCoords) { fetchCurrectPosition() }
  }, [fetchCoords, fetchCurrectPosition])

  return {
    location: userLocation,
    getDestinaceToSalon,
    fetchCurrectPosition,
    ...restContext,
  }
}

export default useGeolocation