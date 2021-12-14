import { client, creditCardFactory } from 'spec'
import { SortDirections } from 'core/consts/sorting'
import fetchCreditCards from '../fetchCreditCards'

describe('fetchCreditCards', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('creditCards', () => [creditCardFactory()])
  def('response', () => ({ creditCards: { data : get.creditCards }}))

  const params = {
    pagination: { size: 10, page: 3 },
    sort: { order: SortDirections.ASC, sortBy: 'field' },
    filters: { idIn: [1] }
  }

  it('calls query', async () => {
    await fetchCreditCards({
      queryFields: 'id',
      ...params,
    })
    expect(client.query).toHasGraphQLQueryCall('creditCards')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns credit cards data', async () => {
    const payload = await fetchCreditCards({
      queryFields: 'id',
      ...params,
    })
    expect(payload).toEqual({ data: get.creditCards })
  })
})
