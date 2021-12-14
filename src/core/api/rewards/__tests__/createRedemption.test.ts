import { errorResponseFactory, client, redemptionFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createRedemption from '../createRedemption'

describe('createRedemption', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  describe('Success', () => {
    def('payload', redemptionFactory)
    def('response', () => ({ createRedemption: { data: get.payload } }))

    def('params', () => ({
      rewardId: 1,
      name: 'John Smith'
    }))

    it('calls mutation', async () => {
      await createRedemption(get.params)
      expect(client.query).toHasGraphQLMutationCall('createRedemption')
      expect(client.query).toHasCalledWithVariables({ payload: get.params })
    })

    it('returns redemption data', async () => {
      const payload = await createRedemption(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createRedemption: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createRedemption(get.params)).rejects.toThrow()
    })
  })
})