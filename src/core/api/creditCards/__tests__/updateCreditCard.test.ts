import { errorResponseFactory, client, creditCardFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import updateCreditCard from '../updateCreditCard'

describe('updateCreditCard', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({
    id: 1,
    default: true,
  }))

  describe('Success', () => {
    def('payload', creditCardFactory)
    def('response', () => ({ updateCreditCard: { data: get.payload } }))

    it('calls mutation', async () => {
      await updateCreditCard(get.params)
      expect(client.query).toHasGraphQLMutationCall('updateCreditCard')
      expect(client.query).toHasCalledWithVariables({
        id: 1,
        payload: { default: true },
      })
    })

    it('returns credit card data', async () => {
      const payload = await updateCreditCard(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ updateCreditCard: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(updateCreditCard(get.params)).rejects.toThrow()
    })
  })
})