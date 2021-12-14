import splitFullName from '../splitFullName'

describe('splitFullName', () => {
  it('returns first name and empty last name', () => {
    const fullName = 'John'
    expect(splitFullName(fullName)).toEqual({
      firstName: 'John',
      lastName: '',
    })
  })

  it('returns first name and last name', () => {
    const fullName = 'John Smith'
    expect(splitFullName(fullName)).toEqual({
      firstName: 'John',
      lastName: 'Smith',
    })
  })

  it('returns first name and last names', () => {
    const fullName = 'John William Smith '
    expect(splitFullName(fullName)).toEqual({
      firstName: 'John',
      lastName: 'William Smith',
    })
  })
})
