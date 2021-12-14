import { def, get, errorResponseFactory, client } from 'core/spec'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'

import buildMutation from '../buildMutation'
import ApiError from '../apiError'

const query = `
  mutation TestMutation($id: Int!) {
    testMutation(id: $id) {
      data { test }
      errors { ${ERROR_QUERY_FIELDS} }
    }
  }
`

describe('buildMutation', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  const params = { query, id: 1 }

  describe('Success', () => {
    const payload = { test: 1 }
    def('response', () => ({ testMutation: { data: payload } }))

    it('calls mutation', async () => {
      await buildMutation(params)
      expect(client.query).toHasGraphQLMutationCall('testMutation')
      expect(client.query).toHasCalledWithVariables({ id: 1 })
    })

    it('returns correct data', async () => {
      const payload = await buildMutation(params)
      expect(payload).toEqual(payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ testMutation: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(buildMutation(params)).rejects.toThrow()
    })
  })
})
