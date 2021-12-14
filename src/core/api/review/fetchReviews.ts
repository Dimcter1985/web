import buildQuery from 'core/utils/api/buildQuery'

const DEFAULT_QUERY = 'id reviewerName'

const query = (queryFields: string): string => `
  query Reviews(
    $pagination: Pagination
    $sort: Sort
    $filters: ReviewsFilters
  ) {
    reviews(
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

export interface IFetchReviewsParams {
  queryFields?: string
  pagination?: IPagination
  sort?: {
    order: ISortDirection
    sortBy: string
  }
  filters?: {
    idIn?: number[]
    salonIdEq?: number
  }
}

const fetchReviews = <T = IListSalon>({
  queryFields = DEFAULT_QUERY,
  ...params
}: IFetchReviewsParams = {}): Promise<IResponseWithTotal<T>> => (
    buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
  )

export default fetchReviews
