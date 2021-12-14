import moment from 'moment'
import daysDiff from '../daysDiff'

describe('daysDiff', () => {
  it('return correct value', () => {
    const date = moment().add(2, 'days').toDate()
    expect(daysDiff(date)).toEqual(2)
  })
})
