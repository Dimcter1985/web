import { LOCATION_QUERY_FIELDS } from 'core/api/consts/common'

export const SALONS_QUERY_FIELDS = `
  id
  name
  slug
  location { ${LOCATION_QUERY_FIELDS} }
`
