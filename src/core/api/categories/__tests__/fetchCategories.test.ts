import { client, categoryFactory } from 'spec'
import fetchCategories from '../fetchCategories'

describe('fetchCategories', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('categories', () => [categoryFactory()])
  def('response', () => ({ categories: { data : get.categories }}))

  it('calls query', async () => {
    await fetchCategories({ queryFields: 'id' })
    expect(client.query).toHasGraphQLQueryCall('categories')
  })

  it('returns categories data', async () => {
    const payload = await fetchCategories()
    expect(payload).toEqual({ data: get.categories })
  })
})
