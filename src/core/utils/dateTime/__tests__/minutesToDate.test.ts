import { TIME_FORMAT } from 'core/consts/dateTime'
import minutesToDate from '../minutesToDate'

describe('minutesToDate', () => {
  it('return correct value', () => {
    expect(minutesToDate(650).format(TIME_FORMAT)).toEqual('10:50 AM')
  })
})
