import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import useGeolocation from 'core/hooks/useGeolocation'

const TrackGeolocation: React.FC = () => {
  const { location } = useGeolocation()

  useEffect(() => {
    Cookies.set('location', JSON.stringify({ lat: location.lat, lng: location.lng }), { expires: 365 })
  }, [location])

  return null
}

export default TrackGeolocation
