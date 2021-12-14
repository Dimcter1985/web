import moment from 'moment'
import extractTimeSlot from '../extractTimeSlot'

describe('extractTimeSlot', () => {
  it('returns correct value', () => {
    const date = moment().startOf('day').add(20, 'minutes').toDate()
    expect(extractTimeSlot(date)).toEqual(20)
  })
})
