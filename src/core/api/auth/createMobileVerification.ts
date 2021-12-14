import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation CreateMobileVerification($payload: CreateMobileVerificationInputs!) {
    createMobileVerification(payload: $payload) {
      data {
        success
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IParams {
  mobile: string
  type?: 'signin' | 'signup'
}

const createMobileVerification = (payload: IParams): Promise<IResult> => (
  buildMutation<IResult>({ query, ...{ payload } })
)

export default createMobileVerification