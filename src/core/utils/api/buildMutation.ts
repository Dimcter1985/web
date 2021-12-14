import { gql } from '@apollo/client'
import { camelCase } from 'lodash'

import normalizeApolloError from './normalizeApolloError'
import castError from './castError'
import client from './client'

interface IMutationParams {
  query: string
}

function getMutationName(query: string): string {
  const result = query.match(/mutation (\w+)/)
  if (!result) throw new Error('Mutation name is missing')
  return camelCase(result[1])
}

const buildMutation = <T, P extends IMutationParams = IMutationParams>({ query, ...params }: P): Promise<T> => (
  client
    .query({ query: gql(query), variables: params, fetchPolicy: 'no-cache' })
    .then(({ data }) => castError<T>(data[getMutationName(query)]))
    .catch(normalizeApolloError)
)

export default buildMutation