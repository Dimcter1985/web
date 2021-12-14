import formatDate from '../formatDate'

describe('formatDate', () => {
  it('returns correct date and time', () => {
    const date = new Date(2020, 9, 20, 10, 30, 0, 0).toISOString()
    expect(formatDate(date, 'M/D/YYYY, H:mma')).toEqual('10/20/2020, 10:30am')
  })
})
