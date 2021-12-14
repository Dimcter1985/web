import { client } from 'core/spec'
import buildQuery from '../buildQuery'

const query = `
  query TestQuery($id: Int!) {
    testQuery(id: $id) {
      test
    }
  }
`

describe('buildQuery', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const params = { query, id: 1 }
  const payload = { test: 1 }

  def('response', () => ({ testQuery: payload }))

  it('calls query', async () => {
    await buildQuery(params)
    expect(client.query).toHasGraphQLQueryCall('testQuery')
    expect(client.query).toHasCalledWithVariables({ id: 1 })
  })

  it('returns correct data', async () => {
    const payload = await buildQuery(params)
    expect(payload).toEqual(payload)
  })
})
