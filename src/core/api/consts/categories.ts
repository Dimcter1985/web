import { IMAGE_QUERY_FIELDS } from './common'

export const CATEGORY_SERVICE_QUERY_FIELDS = `
  id
  name
  position
  duration
  inFavorites
`

export const SALON_SERVICE_QUERY_FIELDS = `
  id
  name
  duration
  cost
`

export const LIST_CATEGORY_QUERY_FIELDS = `
  id
  name
  position
  image { ${IMAGE_QUERY_FIELDS} }
  services { ${CATEGORY_SERVICE_QUERY_FIELDS} }
`

export const SALON_CATEGORY_QUERY_FIELDS = `
  id
  name
  position
  salonServices { ${SALON_SERVICE_QUERY_FIELDS} }
`