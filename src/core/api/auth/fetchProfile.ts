import { CUSTOMER_REFRESH_QUERY_FIELDS } from 'core/api/consts/customer'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Profile {
    profile {
      ${queryFields}
    }
  }
`

interface IParams {
  queryFields?: string
}

const fetchProfile = <T = ICustomer>({
  queryFields = CUSTOMER_REFRESH_QUERY_FIELDS,
}: IParams = {}): Promise<T> => (
  buildQuery<T>({ query: query(queryFields) })
)

export default fetchProfile