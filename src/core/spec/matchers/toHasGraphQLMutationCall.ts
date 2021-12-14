import get from 'lodash/get'

export default function toHasGraphQLMutationCall(this: any, subject: jest.Mock, mutationName: string): any {
  const to = this.isNot ? 'not to' : 'to'

  if (subject.mock.calls.length === 0) {
    return {
      pass: false,
      message: (): string => (
        `Expected ${to} has mutation call '${mutationName}' but hasn't call at all`
      ),
    }
  }

  const params = subject.mock.calls[0][0]

  if (!params || !params.query) {
    return {
      pass: false,
      message: (): string => (
        `Expected ${to} has mutation call '${mutationName}' but hasn't query parameter`
      ),
    }
  }

  const { query } = params
  const operation = get(query, 'definitions[0].operation')

  if (operation !== 'mutation') {
    return {
      pass: false,
      message: (): string => (
        `Expected ${to} has call mutation, but call ${operation}`
      ),
    }
  }

  const rootFieldName = get(query, 'definitions[0].selectionSet.selections[0].name.value')

  return {
    pass: rootFieldName === mutationName,
    message: (): string => (
      `Expected ${to} has mutation call '${mutationName}' but '${rootFieldName}' was called`
    ),
  }
}