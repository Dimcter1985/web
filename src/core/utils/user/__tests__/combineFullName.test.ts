import { userFactory } from 'core/spec'
import combineFullName from '../combineFullName'

describe('combineFullName', () => {
  it('returns correct name', () => {
    const user = userFactory({ firstName: 'John', lastName: 'Smith' })
    expect(combineFullName(user)).toBe('John Smith')
  })
})
