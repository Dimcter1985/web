import { LIST_CATEGORY_QUERY_FIELDS } from 'core/api/consts/categories'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Categories(
    $pagination: Pagination
    $sort: Sort
    $filters: CategoriesFilters
  ) {
    categories(
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

const fetchCategories = <T = IListCategory>({
  queryFields = LIST_CATEGORY_QUERY_FIELDS,
  ...params
} = {} as IParams): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchCategories