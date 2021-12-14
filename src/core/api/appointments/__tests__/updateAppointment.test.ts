import { errorResponseFactory, client, appointmentFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import updateAppointment from '../updateAppointment'

describe('updateAppointment', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({
    id: 1,
    startsAt: new Date().toISOString(),
    services: [{ serviceId: 1, quantity: 1 }],
    discountId: 6,
    credits: 20,
    tip: 10,
    referralCode: 'TEST10',
    loyaltyCardId: 7,
    technicianId: 4,
    customServices: [{
      name: 'Service',
      cost: 10,
    }],
    specialRequests: 'Some extra requests',
    cardFingerprintId: 5,
    cvv: '123',
  }))

  describe('Success', () => {
    def('payload', appointmentFactory)
    def('response', () => ({ updateAppointment: { data: get.payload } }))

    it('calls mutation', async () => {
      await updateAppointment(get.params)
      expect(client.query).toHasGraphQLMutationCall('updateAppointment')
      expect(client.query).toHasCalledWithVariables({
        payload: get.params,
      })
    })

    it('returns appointment data', async () => {
      const payload = await updateAppointment(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ updateAppointment: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(updateAppointment(get.params)).rejects.toThrow()
    })
  })
})