import { SALON_CARD_QUERY_FIELDS } from 'core/api/consts/salon'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query LoyaltyCards(
    $pagination: Pagination
    $sort: Sort
    $filters: LoyaltyCardsFilters
  ) {
    loyaltyCards(
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

const fetchLoyaltyCards = <T = ILoyaltyPreviewCard>({
  queryFields = SALON_CARD_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchLoyaltyCards
