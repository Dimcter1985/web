import { errorResponseFactory, client, creditCardFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import deleteCreditCard from '../deleteCreditCard'

describe('deleteCreditCard', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({ id: 1 }))

  describe('Success', () => {
    def('payload', creditCardFactory)
    def('response', () => ({ deleteCreditCard: { data: get.payload } }))

    it('calls mutation', async () => {
      await deleteCreditCard(get.params)
      expect(client.query).toHasGraphQLMutationCall('deleteCreditCard')
      expect(client.query).toHasCalledWithVariables({ id: 1 })
    })

    it('returns credit card data', async () => {
      const payload = await deleteCreditCard(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ deleteCreditCard: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(deleteCreditCard(get.params)).rejects.toThrow()
    })
  })
})