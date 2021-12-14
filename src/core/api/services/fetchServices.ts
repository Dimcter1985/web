import buildQuery from 'core/utils/api/buildQuery'

const DEFAULT_QUERY = 'id name'

const query = (queryFields: string): string => `
  query Services(
    $pagination: Pagination
    $sort: Sort
    $filters: ServicesFilters
  ) {
    services(
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
    searchQuery: string
  }
}

const fetchServices = <T = IService>({
  queryFields = DEFAULT_QUERY,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchServices
