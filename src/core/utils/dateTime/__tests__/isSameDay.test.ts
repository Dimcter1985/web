import moment from 'moment'
import isSameDay from '../isSameDay'

describe('isSameDay', () => {
  it('the same days', () => {
    const date1 = moment().toDate()
    const date2 = moment().toDate()
    expect(isSameDay(date1, date2)).toEqual(true)
  })

  it('not the same days', () => {
    const date1 = moment().add(2, 'days').toDate()
    const date2 = moment().toDate()
    expect(isSameDay(date1, date2)).toEqual(false)
  })
})
