import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query SearchPage(
    $id: Int
    $slug: String
    $searchTerm: String
  ) {
    searchPage(
      id: $id
      slug: $slug
      searchTerm: $searchTerm
    ) {
      ${queryFields}
    }
  }
`

export const SEARCH_PAGE_QUERY_FIELDS = `
  id
  h1
  city
  seoTitle
  seoDescription
  serviceId
`

export enum SearchPageStatus {
  UNPUBLISHED = 'unpublished',
  PUBLISHED = 'published',
  DELETED = 'deleted',
  PENDING = 'pending',
}

export interface ISearchPage {
  id: number;
  salonCount: number;
  slug: string;
  serviceId?: number;
  searchTerm: string;
  seoTitle?: string;
  seoDescription?: string;
  city?: string;
  createdAt?: string;
  desciption?: string;
  h1?: string;
  state?: string;
  status?: SearchPageStatus;
  updatedAt?: string;
}

interface IParams {
  queryFields?: string;
  id?: number;
  slug?: string;
  searchTerm?: string;
}

const fetchSearchPage = <T = ISearchPage>({
  queryFields = SEARCH_PAGE_QUERY_FIELDS, ...params }: IParams,
  ): Promise<T> => (
  buildQuery<T>({ query: query(queryFields), ...params })
)

export default fetchSearchPage
