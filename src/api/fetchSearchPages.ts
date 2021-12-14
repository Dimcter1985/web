import buildQuery from 'core/utils/api/buildQuery'

export type ISearchPage = {
  id: number;
  h1: string;
  slug: string;
}

const SEARCH_PAGE_QUERY_FIELDS = `
  id
  h1
  slug
`

const query = (queryFields: string): string => `
  query SearchPages(
    $pagination: Pagination
    $sort: Sort
    $filters: SearchPagesFilters
  ) {
    searchPages(
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
  queryFields?: string;
  pagination?: IPagination;
  sort?: {
    order: string;
    sortBy: string;
  }
  filters?: {
    searchQuery?: string;
    idIn?: number;
  }
}

const fetchSearchPages = <T = ISearchPage>({
  queryFields = SEARCH_PAGE_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params})
)

export default fetchSearchPages
