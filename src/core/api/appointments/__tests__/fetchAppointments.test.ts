import { appointmentFactory, client } from 'spec'
import fetchAppointments from '../fetchAppointments'

describe('fetchAppointments', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('appointments', () => [appointmentFactory()])
  def('response', () => ({ appointments: { data : get.appointments }}))

  it('calls query', async () => {
    await fetchAppointments()
    expect(client.query).toHasGraphQLQueryCall('appointments')
  })

  it('returns appointments data', async () => {
    const payload = await fetchAppointments()
    expect(payload).toEqual({ data: get.appointments })
  })
})
