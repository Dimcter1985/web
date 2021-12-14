import { client, globalSettingsFactory } from 'spec'
import fetchGlobalSettings from '../fetchGlobalSettings'

describe('fetchGlobalSettings', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('settings', globalSettingsFactory)
  def('response', () => ({ globalSettings: { data : get.settings }}))

  it('calls query', async () => {
    await fetchGlobalSettings()
    expect(client.query).toHasGraphQLQueryCall('globalSettings')
  })

  it('returns settings', async () => {
    const payload = await fetchGlobalSettings()
    expect(payload).toEqual({ data: get.settings })
  })
})
