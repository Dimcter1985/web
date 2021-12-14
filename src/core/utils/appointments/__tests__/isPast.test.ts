import moment from 'moment'
import isPast from '../isPast'

describe('isPast', () => {
  it('return true for `after time`', () => {
    const endsAt = moment().subtract(10, 'minutes').toISOString()
    expect(isPast({ endsAt })).toEqual(true)
  })

  it('return false `before time`', () => {
    const endsAt = moment().add(10, 'minutes').toISOString()
    expect(isPast({ endsAt })).toEqual(false)
  })
})
