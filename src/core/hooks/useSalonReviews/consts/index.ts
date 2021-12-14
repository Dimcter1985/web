import { IMAGE_QUERY_FIELDS } from 'core/api/consts/common'

export const REVIEWS_QUERY_FIELDS = `
  cleanlinessRating
  promptnessRating
  professionalismRating
  overallRating
  reviews {
    id
    averageRating
    createdAt
    comment
    serviceNames
    customer {
      id
      avatar
      firstName
      lastName
    }
    photos {
      id
      image { ${IMAGE_QUERY_FIELDS} }
    }
  }
`