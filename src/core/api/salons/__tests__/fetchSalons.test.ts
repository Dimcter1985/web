import { client, salonListFactory } from 'spec'
import { SalonsSortBy, SortDirections } from 'core/consts/sorting'
import fetchSalons from '../fetchSalons'

describe('fetchSalons', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('salons', () => [salonListFactory()])
  def('response', () => ({ salons: { data : get.salons }}))

  const params = {
    pagination: { size: 10, page: 3 },
    sort: { order: SortDirections.ASC, sortBy: SalonsSortBy.DISTANCE },
    filters: {
      lng: 123,
      lat: 456,
      searchQuery: 'query',
      ids: [1],
      neighborhoods: [2],
      withTipsOnly: true,
      maxDistance: 10,
    }
  }

  it('calls query', async () => {
    await fetchSalons({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('salons')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns salons data', async () => {
    const payload = await fetchSalons({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.salons })
  })
})
