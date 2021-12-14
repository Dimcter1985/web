import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation CreateReview($payload: CreateReviewInputs!) {
    createReview(payload: $payload) {
      data {
        ${queryFields}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

export interface ICreateReviewParams<F> {
  queryFields: string
  appointmentId: number
  professionalismRating: number
  promptnessRating: number
  cleanlinessRating: number
  overallRating: number
  comment?: string
  anonymous?: boolean
  photosAttributes?: Array<{
    image: F // ReactNativeFile (app) or File (web)
    position?: number
    main?: boolean
  }>
}

const createReview = <T, F>({ queryFields, ...payload }: ICreateReviewParams<F>): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ payload } })
)

export default createReview