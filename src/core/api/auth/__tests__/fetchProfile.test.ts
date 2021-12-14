import { client, customerFactory } from 'spec'
import fetchProfile from '../fetchProfile'

describe('fetchProfile', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const profile = customerFactory()
  const params = { queryFields: 'id' }

  def('response', () => ({ profile }))

  it('calls query', async () => {
    await fetchProfile(params)
    expect(client.query).toHasGraphQLQueryCall('profile')
  })

  it('returns profile data', async () => {
    const payload = await fetchProfile(params)
    expect(payload).toEqual(profile)
  })
})
