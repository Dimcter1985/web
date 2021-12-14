import { IMAGE_QUERY_FIELDS } from 'core/api/consts/common'

export type IReviewFormValues = Pick<IReview,
  | 'overallRating'
  | 'promptnessRating'
  | 'professionalismRating'
  | 'cleanlinessRating'
  | 'comment'
  | 'anonymous'
  | 'photos'
>

export type IReviewAppointment = Pick<IAppointment,
| 'id'
| 'startsAt'
> & {
  salon: Pick<ISalon, 'name' | 'timezone'>,
  review?: IReviewFormValues,
}

const LIST_SALON_QUERY_FIELDS = `
  id
  name
  timezone
`

const LIST_REVIEW_QUERY_FIELDS = `
  id
  overallRating
  promptnessRating
  professionalismRating
  cleanlinessRating
  comment
  anonymous
  photos {
    id
    image { ${IMAGE_QUERY_FIELDS} }
  }
`

export const LIST_APPOINTMENT_QUERY_FIELDS = `
  id
  startsAt
  salon {
    ${LIST_SALON_QUERY_FIELDS}
  }
  review {
    ${LIST_REVIEW_QUERY_FIELDS}
  }
`

export type IReturnReview = Pick<IReviewAppointment, 'id'>
export const RETURN_QUERY_REVIEW = 'id'
export const COUNT_OF_ROWS = 5
export const COMMENT_PLACEHOLDER = `How was your appointment?
What did you like or dislike?`
export const REQUIRED_FIELD = '^Please select a star rating'
export const MAX_PHOTOS = 3
export const MAX_COMMENT_LENGHT = 300
