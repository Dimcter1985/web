import { LIST_SALON_QUERY_FIELDS } from 'core/api/consts/salon'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Salons(
    $pagination: Pagination
    $sort: SalonsSort
    $filters: SalonsFilters
  ) {
    salons(
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

export interface IParams {
  queryFields?: string
  pagination?: IPagination
  sort?: {
    order: ISortDirection
    sortBy: ISalonsSortBy
  }
  filters?: {
    lng?: number
    lat?: number
    searchQuery?: string
    ids?: number[]
    neighborhoods?: number[]
    withTipsOnly?: boolean
    maxDistance?: number
    searchPageId?: number
  }
}

const fetchSalons = <T = IListSalon>({
  queryFields = LIST_SALON_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
    buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
  )

export default fetchSalons
