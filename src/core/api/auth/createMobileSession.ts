import { CUSTOMER_QUERY_FIELDS } from 'core/api/consts/customer'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation CreateMobileSession($payload: CreateMobileSessionInputs!) {
    createMobileSession(payload: $payload) {
      data {
        ${CUSTOMER_QUERY_FIELDS}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

const createMobileSession = (payload: ISignInParams): Promise<ICustomer> => (
  buildMutation<ICustomer>({ query, ...{ payload } })
)

export default createMobileSession