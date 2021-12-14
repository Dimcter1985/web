import { REDEMPTION_QUERY_FIELDS } from 'core/api/consts/rewards'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation CreateRedemption($payload: CreateRedemptionInputs!) {
    createRedemption(payload: $payload) {
      data {
        ${REDEMPTION_QUERY_FIELDS}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IParams {
  rewardId: number
  name: string
  streetAddress?: string
  addressLine2?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  phone?: string
  email?: string
}

const createRedemption = (payload: IParams): Promise<ICreatedRedemption> => (
  buildMutation<ICreatedRedemption>({ query, ...{ payload } })
)

export default createRedemption