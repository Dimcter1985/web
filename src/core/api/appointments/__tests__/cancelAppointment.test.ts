import { errorResponseFactory, client, listAppointmentFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import cancelAppointment from '../cancelAppointment'

describe('cancelAppointment', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({ id: 1 }))

  describe('Success', () => {
    def('payload', listAppointmentFactory)
    def('response', () => ({ cancelAppointment: { data: get.payload } }))

    it('calls mutation', async () => {
      await cancelAppointment(get.params)
      expect(client.query).toHasGraphQLMutationCall('cancelAppointment')
      expect(client.query).toHasCalledWithVariables({ id: 1 })
    })

    it('returns appointment data', async () => {
      const payload = await cancelAppointment(get.params)
      expect(payload).toEqual(get.payload)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ cancelAppointment: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(cancelAppointment(get.params)).rejects.toThrow()
    })
  })
})