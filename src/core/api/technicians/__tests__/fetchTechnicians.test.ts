import { client, technicianFactory } from 'spec'
import fetchTechnicians from '../fetchTechnicians'

describe('fetchTechnicians', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('technicians', () => [technicianFactory()])
  def('response', () => ({ technicians: { data : get.technicians }}))

  const params = {
    pagination: { size: 10, page: 3 },
    filters: {
      searchDate: new Date().toISOString(),
      serviceIds: [1],
      salonId: 2,
      appointmentId: 3,
      additionalDuration: 30,
    }
  }

  it('calls query', async () => {
    await fetchTechnicians({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('technicians')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns technicians data', async () => {
    const payload = await fetchTechnicians({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.technicians })
  })
})
