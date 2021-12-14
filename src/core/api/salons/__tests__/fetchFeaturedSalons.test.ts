import { client, salonListFactory } from 'spec'
import fetchFeaturedSalons from '../fetchFeaturedSalons'

describe('fetchFeaturedSalons', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('salons', () => [salonListFactory()])
  def('response', () => ({ featuredSalons: { data : get.salons }}))

  const params = {
    pagination: { size: 10, page: 3 },
  }

  it('calls query', async () => {
    await fetchFeaturedSalons({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('featuredSalons')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns salons data', async () => {
    const payload = await fetchFeaturedSalons({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.salons })
  })
})
