import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Salon(
    $id: Int
    $slug: String
    ${queryFields.includes('lastReviewsCount') ? '$lastReviewsCount: Int' : ''}
  ) {
    salon(
      id: $id
      slug: $slug
    ) {
      ${queryFields}
    }
  }
`

interface IParams {
  queryFields: string
  id?: number
  slug?: string
  lastReviewsCount?: number
}

const fetchSalon = <T = ISalon>({ queryFields, ...params }: IParams): Promise<T> => (
  buildQuery<T>({ query: query(queryFields), ...params })
)

export default fetchSalon
