// import { CUSTOMER_QUERY_FIELDS } from 'core/api/consts/customer'

import buildQuery from './utils/buildQuery'

// TODO: waiting for mobile and token fields
const CUSTOMER_QUERY_FIELDS = `
  avatar
  birthday
  email
  firstName
  id
  lastName
  points
  referralCode
`

const query = (queryFields: string): string => `
  query Profile {
    profile {
      ${queryFields}
    }
  }
`

interface IParams {
  queryFields?: string
  token?: string
}

const fetchProfile = <T = ICustomer>({
  queryFields = CUSTOMER_QUERY_FIELDS,
  token,
}: IParams = {}): Promise<T> => (
  buildQuery<T>({ query: query(queryFields), token })
)

export default fetchProfile
