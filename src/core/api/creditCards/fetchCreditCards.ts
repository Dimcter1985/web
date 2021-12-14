import { CREDIT_CARD_QUERY_FIELDS } from 'core/api/consts/creditCards'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query CreditCards(
    $pagination: Pagination
    $sort: Sort
    $filters: CreditCardsFilters
  ) {
    creditCards(
      pagination: $pagination
      sort: $sort
      filters: $filters
    ) {
      data {
        ${queryFields}
      }
      total
    }
  }
`

interface IParams {
  queryFields?: string
  pagination?: IPagination
  sort?: {
    order: ISortDirection
    sortBy: string
  }
  filters?: {
    idIn: number[]
  }
}

const fetchCreditCards = <T = IListCreditCard>({
  queryFields = CREDIT_CARD_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchCreditCards
