import { errorResponseFactory, client, creditCardFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createCreditCard from '../createCreditCard'

describe('createCreditCard', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({
    number: '4111111111111111',
    expirationMonth: '12',
    expirationYear: '50',
    cvv: '123',
    cardholderName: 'John Smith',
    postalCode: '12345',
    default: true,
  }))

  describe('Success', () => {
    def('payload', creditCardFactory)
    def('response', () => ({ createCreditCard: { data: get.payload } }))

    it('calls mutation', async () => {
      await createCreditCard(get.params)
      expect(client.query).toHasGraphQLMutationCall('createCreditCard')
      expect(client.query).toHasCalledWithVariables({
        payload: get.params,
      })
    })

    it('returns credit card data', async () => {
      const payload = await createCreditCard(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createCreditCard: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createCreditCard(get.params)).rejects.toThrow()
    })
  })
})