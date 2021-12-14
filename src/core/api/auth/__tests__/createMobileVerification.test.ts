import { errorResponseFactory, client } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createMobileVerification from '../createMobileVerification'

describe('createMobileVerification', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  describe('Success', () => {
    def('payload', () => ({ success: true }))
    def('response', () => ({ createMobileVerification: { data: get.payload } }))

    def('params', () => ({
      mobile: '+19171112233',
    }))

    it('calls mutation', async () => {
      await createMobileVerification(get.params)
      expect(client.query).toHasGraphQLMutationCall('createMobileVerification')
      expect(client.query).toHasCalledWithVariables({ payload: get.params })
    })

    it('returns customer data', async () => {
      const payload = await createMobileVerification(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createMobileVerification: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createMobileVerification(get.params)).rejects.toThrow()
    })
  })
})


