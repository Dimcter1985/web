import { SortDirections } from 'core/consts/sorting'
import { client, loyaltyCardFactory } from 'spec'
import fetchLoyaltyCards from '../fetchLoyaltyCards'

describe('fetchLoyaltyCards', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('loyaltyCards', () => [loyaltyCardFactory()])
  def('response', () => ({ loyaltyCards: { data : get.loyaltyCards }}))

  const params = {
    pagination: { size: 10, page: 3 },
    sort: { order: SortDirections.ASC, sortBy: 'field' },
    filters: { idIn: [1] }
  }

  it('calls query', async () => {
    await fetchLoyaltyCards({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('loyaltyCards')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns loyalty cards data', async () => {
    const payload = await fetchLoyaltyCards({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.loyaltyCards })
  })
})
