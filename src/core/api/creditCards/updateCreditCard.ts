import { CREDIT_CARD_QUERY_FIELDS } from 'core/api/consts/creditCards'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation UpdateCreditCard(
      $id: Int!
      $payload: UpdateCreditCardInputs!
    ) {
    updateCreditCard(
      id: $id
      payload: $payload
    ) {
      data {
        ${queryFields}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IParams {
  queryFields?: string
  id: number
  default: boolean
}

const updateCreditCard = <T = IListCreditCard>({
  queryFields = CREDIT_CARD_QUERY_FIELDS,
  id,
  ...payload
}: IParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ id, payload } })
)

export default updateCreditCard