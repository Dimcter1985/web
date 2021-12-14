import isEqual from 'lodash/isEqual'

export default function toHasCalledWithVariables(this: any, subject: jest.Mock, variables: Record<string, any>): any {
  const to = this.isNot ? 'not to' : 'to'

  if (subject.mock.calls.length === 0) {
    return {
      pass: false,
      message: (): string => (
        `Expected ${to} has call with variables but wasn't called at all`
      ),
    }
  }

  const params = subject.mock.calls[0][0]

  if (!params || !params.variables) {
    return {
      pass: false,
      message: (): string => (
        `Expected ${to} has call with variables but they aren't present`
      ),
    }
  }

  return {
    pass: isEqual(variables, params.variables),
    message: (): string => (
      [
        `Expected ${to} has call with:`,
        JSON.stringify(variables, null, 2),
        'but was called with:',
        JSON.stringify(params.variables, null, 2),
      ].join("\n")
    ),
  }
}