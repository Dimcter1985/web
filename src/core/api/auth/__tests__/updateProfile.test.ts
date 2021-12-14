import { customerFactory, errorResponseFactory, client } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import updateProfile from '../updateProfile'

describe('updateProfile', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  describe('Success', () => {
    def('customer', customerFactory)
    def('response', () => ({ updateProfile: { data: get.customer } }))

    def('params', () => ({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@smith.com',
      mobile: '+19171112233',
    }))

    it('calls mutation', async () => {
      await updateProfile(get.params)
      expect(client.query).toHasGraphQLMutationCall('updateProfile')
      expect(client.query).toHasCalledWithVariables({ payload: get.params })
    })

    it('returns customer data', async () => {
      const payload = await updateProfile(get.params)
      expect(payload).toEqual(get.customer)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ updateProfile: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(updateProfile(get.params)).rejects.toThrow()
    })
  })
})