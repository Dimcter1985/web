import { gql } from '@apollo/client'
import { camelCase } from 'lodash'
import client from './client'

interface IQueryParams {
  query: string
  token?: string
}

function getQueryName(query: string): string {
  const result = query.match(/query (\w+)/)
  if (!result) throw new Error('Query name is missing')
  return camelCase(result[1])
}

const buildQuery = <T, P extends IQueryParams = IQueryParams>({ query, token, ...params }: P): Promise<T> => (
  client({ token })
    .query({ query: gql(query), variables: params, fetchPolicy: 'no-cache' })
    .then(({ data }) => data[getQueryName(query)])
)

export default buildQuery