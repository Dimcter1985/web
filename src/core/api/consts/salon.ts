import { IMAGE_QUERY_FIELDS, LOCATION_QUERY_FIELDS } from './common'

export const SEARCH_SALON_ITEM_QUERY_FIELDS = `
  id
  name
  location { ${LOCATION_QUERY_FIELDS} }
`

export const LIST_SALON_QUERY_FIELDS = `
  id
  address
  addressLine2
  state
  zipCode
  name
  image { ${IMAGE_QUERY_FIELDS} }
  city
  location { ${LOCATION_QUERY_FIELDS} }
  reviewsCount
  averageRating
  tipping
  tax
  slug
  timezone
  nonSnailz
  activeLoyaltyProgram {
    id
  }
`

export const LIST_FREE_SLOTS_QUERY_FIELDS = `
  salon {
    ${LIST_SALON_QUERY_FIELDS}
    timezone
  }
  salonServices {
    id
    name
    cost
    services {
      id
    }
  }
  slots {
    slots
    technicianId
  }
`

export const LOYALTY_PROGRAM_QUERY_FIELDS = `
  id
  description
  kind
  photo { ${IMAGE_QUERY_FIELDS} }
  salon { ${LIST_SALON_QUERY_FIELDS} }
  value
  visits
  salonServices {
    id
    name
    cost
  }
`

export const SALON_CARD_QUERY_FIELDS = `
  id
  loyaltyProgram { ${LOYALTY_PROGRAM_QUERY_FIELDS} }
`

export const WEEK_HOUR_QUERY_FIELDS = `
  start
  end
  work
`

export const WORK_HOURS_QUERY_FIELDS = `
  mon { ${WEEK_HOUR_QUERY_FIELDS} }
  tue { ${WEEK_HOUR_QUERY_FIELDS} }
  wed { ${WEEK_HOUR_QUERY_FIELDS} }
  thu { ${WEEK_HOUR_QUERY_FIELDS} }
  fri { ${WEEK_HOUR_QUERY_FIELDS} }
  sat { ${WEEK_HOUR_QUERY_FIELDS} }
  sun { ${WEEK_HOUR_QUERY_FIELDS} }
`