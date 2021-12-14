import { createUploadLink } from 'apollo-upload-client'
import {
  ApolloClient, ApolloLink, ApolloQueryResult,
  InMemoryCache, QueryOptions, OperationVariables,
} from '@apollo/client'
import { API_URL, BASE_URL } from 'core/consts'

export class CustomerApolloLink {
  private client: ApolloClient<any> | null = null

  getAuthUrl(): string {
    return `${global.baseUrl || BASE_URL}/${API_URL}`
  }

  getCache(): InMemoryCache {
    return new InMemoryCache({
      addTypename: false,
    })
  }

  getAuthLink(): ApolloLink {
    return new ApolloLink((operation, forward) => {
      const { headers } = operation.getContext()
      operation.setContext({
        headers: {
          ...headers,
          ...(global.token && { authorization: global.token }),
        },
      })
      return forward(operation)
    })
  }

  getUploadLink(): ApolloLink {
    return createUploadLink({ uri: this.getAuthUrl() }) as unknown as ApolloLink
  }

  getClient(): ApolloClient<any> {
    if (this.client) return this.client
    this.client = new ApolloClient({
      link: ApolloLink.from([
        this.getAuthLink(),
        this.getUploadLink(),
      ]),
      cache: this.getCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    })
    return this.client
  }

  query(params: QueryOptions<OperationVariables>): Promise<ApolloQueryResult<any>> {
    return this.getClient().query(params)
  }
}

const client = new CustomerApolloLink()

export default client
