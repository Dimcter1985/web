import { IMAGE_QUERY_FIELDS, LOCATION_QUERY_FIELDS } from 'core/api/consts/common'
import { WORK_HOURS_QUERY_FIELDS } from 'core/api/consts/salon'

export const REVIEW_FIELDS = `
  id
  anonymous
  comment
  reviewerName
  overallRating
  serviceNames
  updatedAt
  photos { 
    id 
    image { ${IMAGE_QUERY_FIELDS} }
  }
  customer {
    avatar
  }
  appointment {
    startsAt
  }
`

export const SALON_FIELDS = `
  id
  averageRating
  name
  reviewsCount
  overallRating
  address
  addressLine2
  city
  description
  state
  zipCode
  phone
  priceRange
  seoTitle
  seoDescription
  speciality
  slug
  tax
  timezone
  tipping
  location { ${LOCATION_QUERY_FIELDS} }
  photos { 
    id 
    image { ${IMAGE_QUERY_FIELDS} }
    main
    position
  }
  salonCategories {
    id
    name
    position
    salonServices {
      id
      categoryId
      cost
      name
      description
    }
  }
  reviews(last: $lastReviewsCount) { ${ REVIEW_FIELDS } }
  workHours { ${WORK_HOURS_QUERY_FIELDS} }
  neighborhoods { id name }
  activeLoyaltyProgram {
    enabled
    value
    visits
    kind
    salonServices {
      id
      name
    }
  }
`
