import { IMAGE_QUERY_FIELDS } from 'core/api/consts/common'

export const REVIEW_QUERY_FIELDS = `
  review {
    id
    averageRating
    promptnessRating
    professionalismRating
    cleanlinessRating
    comment
    overallRating
    createdAt
    photos {
      id
      image { ${IMAGE_QUERY_FIELDS} }
    }
  }
`