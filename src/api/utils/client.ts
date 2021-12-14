import { createUploadLink } from 'apollo-upload-client'
import {
  ApolloClient, 
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

import { API_URL, BASE_URL } from 'core/consts'

interface IParams {
  token?: string
}

const cache = new InMemoryCache({
  addTypename: false,
})

const authUrl = `${global.baseUrl || BASE_URL}/${API_URL}`

const uploadLink: ApolloLink  = createUploadLink({ uri: authUrl }) as unknown as ApolloLink

const getAuthLink = (token?: string): ApolloLink => {
  return new ApolloLink((operation, forward) => {
    const { headers } = operation.getContext()
    operation.setContext({
      headers: {
        ...headers,
        ...(token && { authorization: token }),
      },
    })
    return forward(operation)
  })
}

const client = (params: IParams): ApolloClient<NormalizedCacheObject> => {

  const { token } = params

  return new ApolloClient({
    link: ApolloLink.from([
      getAuthLink(token),
      uploadLink,
    ]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })
}

export default client
