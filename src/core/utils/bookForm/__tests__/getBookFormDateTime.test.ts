import moment from 'moment'
import { DAY_FORMAT } from 'core/consts/dateTime'
import getBookFormDateTime from '../getBookFormDateTime'

describe('getBookFormDateTime', () => {
  describe('today`s date', () => {
    const date = moment().toISOString()
    const slot = 480

    it('returns correct date/time', () => {
      expect(getBookFormDateTime({ date, slot })).toEqual('Today 8:00 AM')
    })
  })

  describe('tomorrows`s date', () => {
    const date = moment().add(1, 'd').toISOString()
    const slot = 495

    it('returns correct date/time', () => {
      expect(getBookFormDateTime({ date, slot })).toEqual('Tomorrow 8:15 AM')
    })
  })

  describe('another day', () => {
    const date = moment().add(10, 'd')
    const slot = 510

    it('returns correct date/time', () => {
      expect(getBookFormDateTime({ date: date.toISOString(), slot })).toEqual(`${date.format(DAY_FORMAT)} 8:30 AM`)
    })
  })
})