declare interface IGeolocationStatic {
  getCurrentPosition(
    success: (position: IGeolocationResponse) => void,
    error?: (error: IGeolocationError) => void,
    options?: IGeolocationOptions
  ): void
}

declare interface IGeolocationResponse {
  coords: {
    latitude: number
    longitude: number
    altitude: number | null
    accuracy: number
    altitudeAccuracy: number | null
    heading: number | null
    speed: number | null
  }
  timestamp: number
}

declare interface IGeolocationError {
  code: number
  message: string
  PERMISSION_DENIED: number
  POSITION_UNAVAILABLE: number
  TIMEOUT: number
}

declare interface IGeolocationOptions {
  timeout?: number
  maximumAge?: number
  enableHighAccuracy?: boolean
  distanceFilter?: number
  useSignificantChanges?: boolean
}