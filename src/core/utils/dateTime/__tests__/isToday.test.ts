import moment from 'moment'
import isToday from '../isToday'

describe('isToday', () => {
  it('today day', () => {
    const date = moment().toDate()
    expect(isToday(date)).toEqual(true)
  })

  it('tomorrow day', () => {
    const date = moment().add(1, 'days').toDate()
    expect(isToday(date)).toEqual(false)
  })
})
