import { errorResponseFactory, client, appointmentFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createAppointment from '../createAppointment'

describe('createAppointment', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({
    salonId: 1,
    services: [{ serviceId: 1, quantity: 1 }],
    technicianId: 4,
    cardFingerprintId: 5,
    startsAt: new Date().toISOString(),
    tip: 10,
    referralCode: 'TEST10',
    credits: 20,
    paymentMethodNonce: 'NONCE',
    discountId: 6,
    loyaltyCardId: 7,
    deviceType: 'app',
    appVersion: '1.0.0',
    specialRequests: 'Some extra requests',
    cvv: '123',
  }))

  describe('Success', () => {
    def('payload', appointmentFactory)
    def('response', () => ({ createAppointment: { data: get.payload } }))

    it('calls mutation', async () => {
      await createAppointment(get.params)
      expect(client.query).toHasGraphQLMutationCall('createAppointment')
      expect(client.query).toHasCalledWithVariables({
        payload: get.params,
      })
    })

    it('returns appointment data', async () => {
      const payload = await createAppointment(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createAppointment: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createAppointment(get.params)).rejects.toThrow()
    })
  })
})