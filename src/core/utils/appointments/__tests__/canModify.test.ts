import moment from 'moment'
import { Statuses } from 'core/consts/appointments'
import { appointmentFactory } from 'core/spec'
import canModify from '../canModify'

describe('canModify', () => {
  describe('Not available to modify', () => {
    it('with booked status', () => {
      const appointment = appointmentFactory({ status: Statuses.DONE })
      expect(canModify(appointment)).toEqual(false)
    })

    it('with correct time', () => {
      const appointment = appointmentFactory({
        startsAt: moment().subtract(5, 'minutes').toISOString(),
      })
      expect(canModify(appointment)).toEqual(false)
    })
  })

  describe('Avaiblable to modify', () => {
    it('with booked status', () => {
      const appointment = appointmentFactory({ status: Statuses.BOOKED })
      expect(canModify(appointment)).toEqual(true)
    })

    it('with correct time', () => {
      const appointment = appointmentFactory({
        startsAt: moment().add(5, 'minutes').toISOString(),
      })
      expect(canModify(appointment)).toEqual(true)
    })
  })
})
