import { salonFactory, client } from 'spec'
import fetchSalon from '../fetchSalon'

describe('fetchSalon', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const salon = salonFactory()
  const params = { queryFields: 'id', id: 1 }

  def('response', () => ({ salon }))

  it('calls query', async () => {
    await fetchSalon(params)
    expect(client.query).toHasGraphQLQueryCall('salon')
    expect(client.query).toHasCalledWithVariables({ id: 1 })
  })

  it('returns salon data', async () => {
    const payload = await fetchSalon(params)
    expect(payload).toEqual(salon)
  })
})
