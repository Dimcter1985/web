import { CREDIT_CARD_QUERY_FIELDS } from 'core/api/consts/creditCards'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation DeleteCreditCard($id: Int!) {
    deleteCreditCard(id: $id) {
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
}

const deleteCreditCard = <T = IListCreditCard>({
  queryFields = CREDIT_CARD_QUERY_FIELDS,
  id,
}: IParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ id } })
)

export default deleteCreditCard