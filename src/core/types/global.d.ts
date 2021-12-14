export {}

declare global {
  namespace jest {
    interface Matchers<R> { // eslint-disable-line
      toHasGraphQLMutationCall(mutationName: string): R
      toHasCalledWithVariables(variables: Record<string, any>): R
      toHasGraphQLQueryCall(queryName: string): R
    }
  }
}