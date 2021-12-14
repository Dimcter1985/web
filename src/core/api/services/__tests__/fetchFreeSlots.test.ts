import { client, salonListFactory } from 'spec'
import { FreeSlotsSortBy, SortDirections } from 'core/consts/sorting'
import fetchFreeSlots from '../fetchFreeSlots'

describe('fetchFreeSlots', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('salons', () => [salonListFactory()])
  def('response', () => ({ freeSlots: { data : get.salons }}))

  const params = {
    pagination: { size: 10, page: 3 },
    sort: { order: SortDirections.ASC, sortBy: FreeSlotsSortBy.DISTANCE },
    filters: {
      serviceIds: [1, 2],
      startsAt: new Date().toISOString(),
      maxDistance: 10,
      lng: 123,
      lat: 456,
      searchQuery: 'query',
      withTipsOnly: true,
      neighborhoodIds: [1],
    }
  }

  it('calls query', async () => {
    await fetchFreeSlots({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('freeSlots')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns slots data', async () => {
    const payload = await fetchFreeSlots({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.salons })
  })
})
