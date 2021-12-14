import { DEFAULT_POSITION } from 'core/consts'

interface ILocatoinFromCookie {
  lat: string
  lng: string
}

const getCurrentLocation = (location?: string): ILocation => {
  if (!location) { return DEFAULT_POSITION }

  const result: ILocatoinFromCookie = JSON.parse(location)
  return ({ lat: parseFloat(result.lat), lng: parseFloat(result.lng) })
}

export default getCurrentLocation
