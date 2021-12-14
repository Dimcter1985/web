import moment from 'moment'
import durationBetweenDates from '../durationBetweenDates'

describe('durationBetweenDates', () => {
  it('returns correct value', () => {
    const date1 = moment().startOf('day').add(2, 'days')
    const date2 = moment().startOf('day')
    expect(durationBetweenDates(date1, date2).asDays()).toEqual(2)
  })
})
