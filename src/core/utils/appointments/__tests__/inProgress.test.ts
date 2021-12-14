import moment from 'moment'
import { appointmentFactory } from 'core/spec'
import inProgress from '../inProgress'

describe('inProgress', () => {
  it('appointment is in progress', () => {
    const appointment = appointmentFactory({
      startsAt: moment().subtract(10, 'minutes').toISOString(),
      endsAt: moment().add(30, 'minutes').toISOString(),
    })
    expect(inProgress(appointment)).toEqual(true)
  })

  it('upcoming appointment', () => {
    const appointment = appointmentFactory({
      startsAt: moment().add(10, 'minutes').toISOString(),
      endsAt: moment().add(30, 'minutes').toISOString(),
    })
    expect(inProgress(appointment)).toEqual(false)
  })

  it('past appointment', () => {
    const appointment = appointmentFactory({
      startsAt: moment().subtract(50, 'minutes').toISOString(),
      endsAt: moment().subtract(30, 'minutes').toISOString(),
    })
    expect(inProgress(appointment)).toEqual(false)
  })
})
