import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation CheckMobileVerification($payload: CheckMobileVerificationInputs!) {
    checkMobileVerification(payload: $payload) {
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
  code: number
}

const checkMobileVerification = (payload: IParams): Promise<IResult> => (
  buildMutation<IResult>({ query, ...{ payload } })
)

export default checkMobileVerification
