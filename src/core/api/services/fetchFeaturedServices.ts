import buildQuery from 'core/utils/api/buildQuery'

const DEFAULT_QUERY = 'id name'

const query = (queryFields: string): string => `
  query FavoriteServices($pagination: Pagination) {
    favoriteServices(pagination: $pagination) {
      data { ${queryFields} }
      total
    }
  }
`

interface IParams {
  queryFields?: string
  pagination?: IPagination
}

const fetchFeaturedSearvices = <T = IService>({
  queryFields = DEFAULT_QUERY,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchFeaturedSearvices