import stringifyDateTime from '../stringifyDateTime'

describe('stringifyDateTime', () => {
  it('without date', () => {
    expect(stringifyDateTime(null)).toEqual(undefined)
  })

  it('return correct value', () => {
    const date = new Date('December 10, 2020 11:00:00').toISOString()
    expect(stringifyDateTime(date)).toMatch(/2020-12-10/)
  })
})
