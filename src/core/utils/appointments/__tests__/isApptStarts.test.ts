import moment from 'moment'
import { appointmentFactory } from 'core/spec'
import isStart from '../isStarted'

describe('isStarts', () => {
  it('appointment is in progress', () => {
    const appointment = appointmentFactory({
      startsAt: moment().subtract(10, 'minutes').toISOString(),
    })
    expect(isStart(appointment)).toEqual(true)
  })

  it('appointment isn`t in progress', () => {
    const appointment = appointmentFactory({
      startsAt: moment().add(10, 'minutes').toISOString(),
    })
    expect(isStart(appointment)).toEqual(false)
  })
})
