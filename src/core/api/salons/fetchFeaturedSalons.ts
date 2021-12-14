import { LIST_SALON_QUERY_FIELDS } from 'core/api/consts/salon'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query FeaturedSalons($pagination: Pagination) {
    featuredSalons(pagination: $pagination) {
      data {
        ${queryFields}
      }
    }
  }
`

interface IParams {
  queryFields?: string
  pagination?: IPagination
}

const fetchFeaturedSalons = <T = IListSalon>({
  queryFields = LIST_SALON_QUERY_FIELDS,
  pagination,
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...{ pagination } })
)

export default fetchFeaturedSalons