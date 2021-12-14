const PREFIX = 'GraphQL error: '

const normalizeApolloError = (error: Error): Promise<never> => {
  if (error.message.startsWith(PREFIX)) {
    return Promise.reject(new Error(error.message.replace(PREFIX, '')))
  }

  return Promise.reject(error)
}

export default normalizeApolloError
