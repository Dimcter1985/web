import { customerFactory, errorResponseFactory, client } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createMobileSession from '../createMobileSession'

describe('createMobileSession', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  describe('Success', () => {
    def('customer', customerFactory)
    def('response', () => ({ createMobileSession: { data: get.customer } }))

    def('params', () => ({
      mobile: '+19171112233',
      code: 1234,
    }))

    it('calls mutation', async () => {
      await createMobileSession(get.params)
      expect(client.query).toHasGraphQLMutationCall('createMobileSession')
      expect(client.query).toHasCalledWithVariables({ payload: get.params })
    })

    it('returns customer data', async () => {
      const payload = await createMobileSession(get.params)
      expect(payload).toEqual(get.customer)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createMobileSession: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createMobileSession(get.params)).rejects.toThrow()
    })
  })
})
