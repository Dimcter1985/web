import moment from 'moment'
import isUpcoming from '../isUpcoming'

describe('isUpcoming', () => {
  it('return true', () => {
    const startsAt = moment().add(10, 'minutes').toISOString()
    expect(isUpcoming({ startsAt })).toEqual(true)
  })

  it('return false for Canceled', () => {
    const startsAt = moment().subtract(10, 'minutes').toISOString()
    expect(isUpcoming({ startsAt })).toEqual(false)
  })
})
