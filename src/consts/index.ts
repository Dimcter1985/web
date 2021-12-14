import environment from './environment'

export const GOOGLE_MAPS_API_KEY = environment.GOOGLE_MAP_API_KEY

export const googleMapURL= `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`

export const SEARCH_QUERY = 'query'

export const CART_KEY = 'cart'

export const DEFAULT_TIMEZONE = 'America/New_York'

export const BLOG_PATH = 'https://medium.com/@getsnailzapp'
