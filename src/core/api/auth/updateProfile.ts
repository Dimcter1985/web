import { CUSTOMER_REFRESH_QUERY_FIELDS } from 'core/api/consts/customer'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation UpdateProfile($payload: UpdateProfileInputs!) {
    updateProfile(payload: $payload) {
      data {
        ${CUSTOMER_REFRESH_QUERY_FIELDS}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

const updateProfile = <T>(payload: T): Promise<IRefreshCustomer> => (
  buildMutation<IRefreshCustomer>({ query, ...{ payload } })
)

export default updateProfile