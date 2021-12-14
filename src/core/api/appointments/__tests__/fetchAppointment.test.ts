import { appointmentFactory, client } from 'spec'
import fetchAppointment from '../fetchAppointment'

describe('fetchAppointment', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const appointment = appointmentFactory()
  const params = { queryFields: 'id', id: 1 }

  def('response', () => ({ appointment }))

  it('calls query', async () => {
    await fetchAppointment(params)
    expect(client.query).toHasGraphQLQueryCall('appointment')
  })

  it('returns appointment data', async () => {
    const payload = await fetchAppointment(params)
    expect(payload).toEqual(appointment)
  })
})
