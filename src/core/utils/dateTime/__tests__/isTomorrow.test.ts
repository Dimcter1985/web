import moment from 'moment'
import isTomorrow from '../isTomorrow'

describe('isTomorrow', () => {
  it('today day', () => {
    const date = moment().toDate()
    expect(isTomorrow(date)).toEqual(false)
  })

  it('tomorrow day', () => {
    const date = moment().add(1, 'days').toDate()
    expect(isTomorrow(date)).toEqual(true)
  })
})
