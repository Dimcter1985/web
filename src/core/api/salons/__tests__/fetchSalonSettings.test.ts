import { client, salonSettingsFactory } from 'spec'
import fetchSalonSettings from '../fetchSalonSettings'

describe('fetchFeaturedSalons', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const params = { queryFields: 'id', salonId: 1 }
  const settings = salonSettingsFactory()
  def('response', () => ({ salonSettings: { data: settings }}))

  it('calls query', async () => {
    await fetchSalonSettings(params)
    expect(client.query).toHasGraphQLQueryCall('salonSettings')
    expect(client.query).toHasCalledWithVariables({ salonId: 1 })
  })

  it('returns settings data', async () => {
    const payload = await fetchSalonSettings(params)
    expect(payload).toEqual({ data: settings })
  })
})
