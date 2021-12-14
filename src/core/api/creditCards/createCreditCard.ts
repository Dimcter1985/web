import { CREDIT_CARD_QUERY_FIELDS } from 'core/api/consts/creditCards'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation CreateCreditCard($payload: CreateCreditCardInputs!) {
    createCreditCard(payload: $payload) {
      data {
        ${queryFields}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

export interface IParams {
  queryFields?: string
  number: string
  expirationMonth: string
  expirationYear: string
  cvv: string
  cardholderName?: string
  postalCode: string
  default: boolean
}

const createCreditCard = <T = IListCreditCard>({
  queryFields = CREDIT_CARD_QUERY_FIELDS,
  ...payload
}: IParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ payload } })
)

export default createCreditCard