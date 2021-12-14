import { IMAGE_QUERY_FIELDS, LOCATION_QUERY_FIELDS } from 'core/api/consts/common'
import { WORK_HOURS_QUERY_FIELDS } from 'core/api/consts/salon'

const queryFields = `
  id
  name
  reviewsCount
  overallRating
  address
  addressLine2
  city
  state
  zipCode
  phone
  priceRange
  seoTitle
  seoDescription
  slug
  tax
  timezone
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
    }
  }
  reviews {
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
  }
  workHours { ${WORK_HOURS_QUERY_FIELDS} }
  neighborhoods {
    id
    name
  }
`

export default queryFields
