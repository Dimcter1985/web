import { customerFactory, errorResponseFactory, client } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createProfile from '../createProfile'

describe('createProfile', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  describe('Success', () => {
    def('customer', customerFactory)
    def('response', () => ({ createProfile: { data: get.customer } }))

    def('params', (): ISignUpParams => ({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@smith.com',
      mobile: '+19171112233',
      code: 1234,
      aboutUs: 'Facebook',
      deviceType: 'iOS',
      zipCode: '10001',
    }))

    it('calls mutation', async () => {
      await createProfile(get.params)
      expect(client.query).toHasGraphQLMutationCall('createProfile')
      expect(client.query).toHasCalledWithVariables({ payload: get.params })
    })

    it('returns customer data', async () => {
      const payload = await createProfile(get.params)
      expect(payload).toEqual(get.customer)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createProfile: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createProfile(get.params)).rejects.toThrow()
    })
  })
})