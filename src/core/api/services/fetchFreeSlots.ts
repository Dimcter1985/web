import { LIST_FREE_SLOTS_QUERY_FIELDS } from 'core/api/consts/salon'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query FreeSlots(
    $pagination: Pagination
    $sort: FreeSlotsSort
    $filters: FreeSlotsFilters!
  ) {
    freeSlots(
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
    sortBy: IFreeSlotsSortBy
  }
  filters?: {
    serviceIds: number[]
    startsAt: string
    maxDistance?: number
    lat?: number
    lng?: number
    searchQuery?: string
    withTipsOnly?: boolean
    neighborhoodIds?: number[]
  }
}

const fetchFreeSlots = <T = IListFreeSlot>({
  queryFields = LIST_FREE_SLOTS_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchFreeSlots
