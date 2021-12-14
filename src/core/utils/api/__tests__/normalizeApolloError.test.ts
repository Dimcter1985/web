import normalizeApolloError from '../normalizeApolloError'

describe('normalizeApolloError', () => {
  it('gql error', () => {
    const error = new Error('GraphQL error: Error')
    try {
      normalizeApolloError(error).catch(() => null)
    } catch (error) {
      expect(error).toMatch('Error')
    }
  })

  it('standart error', () => {
    const error = new Error('Error')
    try {
      normalizeApolloError(error).catch(() => null)
    } catch (error) {
      expect(error).toMatch('Error')
    }
  })
})
