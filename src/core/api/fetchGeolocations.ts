import { GEOCODE_KEY } from 'core/consts'
import qs from 'qs'

interface IAddressComponents {
  long_name: string
  short_name: string
  types: string[]
}

interface IResult {
  address_components: IAddressComponents[]
  formatted_address: string
  geometry: any
  place_id: string
  types: string[]
}

interface IResponse {
  plus_code: { compound_code: string, global_code: string }
  results: IResult[]
  status: string
}

interface IOptions {
  result_type?: 'locality'
}

interface IParams {
  location: ILocation
  options?: IOptions
}

const buildQueryParams = (params: Record<string, unknown> | string | null = null): string => (
  qs.stringify(params, { arrayFormat: 'brackets', skipNulls: true })
)

const fetchGeolocations = <T = IResponse>({ location }: IParams): Promise<T> => {
  const { lat, lng } = location

  const params = buildQueryParams({
    latlng: `${lat},${lng}`,
    result_type: 'locality',
    key: GEOCODE_KEY,
  })

  return (
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`)
      .then(response => response.json())
      .catch((err) => err)
  )
}

export default fetchGeolocations
