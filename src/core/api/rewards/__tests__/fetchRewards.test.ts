import { client, rewardFactory } from 'spec'
import { SortDirections } from 'core/consts/sorting'
import fetchRewards from '../fetchRewards'

describe('fetchRewards', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('rewards', () => [rewardFactory()])
  def('response', () => ({ rewards: { data : get.rewards }}))

  const params = {
    pagination: { size: 10, page: 3 },
    sort: { order: SortDirections.ASC, sortBy: 'field' },
    filters: { idIn: [1] }
  }

  it('calls query', async () => {
    await fetchRewards({ queryFields: 'id', ...params })
    expect(client.query).toHasGraphQLQueryCall('rewards')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns rewards data', async () => {
    const payload = await fetchRewards({ queryFields: 'id', ...params })
    expect(payload).toEqual({ data: get.rewards })
  })
})