import moment from 'moment'
import { act, renderHook } from '@testing-library/react-hooks'

import { def, get, listAppointmentFactory, salonSettingsFactory, waitFor } from 'core/spec'
import { CANCELLATION_FEE_TYPE_CASH, CANCELLATION_FEE_TYPE_PERCENT } from 'core/consts'
import cancelAppointment from 'core/api/appointments/cancelAppointment'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import useCancelAppointment from '../useCancelAppointment'

jest.mock('core/api/salons/fetchSalonSettings', () => jest.fn())
jest.mock('core/api/appointments/cancelAppointment', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useCancelAppointment', () => {
  def('subject', () => renderHook(() => (
    useCancelAppointment({
      appointment: get.appointment,
      onError: get.onError,
    }))
  ))

  beforeEach(() => {
    jest.clearAllMocks()
    // @ts-ignore
    fetchSalonSettings.mockResolvedValue(get.response || salonSettingsFactory())
  })

  def('response', () => salonSettingsFactory({
    cancelationFeePeriod: 30,
    cancelationFeeType: get.cancelationFeeType,
    cancelationFee: 30,
  }))

  def('appointment', listAppointmentFactory)
  def('onError', jest.fn)
  def('onSuccessCancel', jest.fn)

  const hasCorrectCancelMessage = (cancelMessage: RegExp) => {
    it('has correct message', async () => {
      const { result } = get.subject

      await act(async () => {
        await waitFor(() => {
          expect(result.current.cancelationMessage).toMatch(cancelMessage)
        })
      })
    })
  }

  it('cancels the appointment', async () => {
    const { result } = get.subject

    await act(async () => {
      await waitFor(async () => {
        await result.current.cancel(get.onSuccessCancel)
        expect(cancelAppointment).toBeCalledWith({ id: get.appointment.id })
        expect(get.onSuccessCancel).toBeCalled()
      })
    })
  })

  describe('Cancellation with panalty fee', () => {
    def('appointment', () => listAppointmentFactory({
      cost: 120,
      startsAt: moment().add(10, 'minutes').toISOString(),
    }))

    describe('Fee type - cash', () => {
      def('cancelationFeeType', () => CANCELLATION_FEE_TYPE_CASH)
      hasCorrectCancelMessage(/will be charged \$30\.00/)
    })

    describe('Fee type - percent', () => {
      def('cancelationFeeType', () => CANCELLATION_FEE_TYPE_PERCENT)
      hasCorrectCancelMessage(/will be charged \$36\.00/)
    })
  })

  describe('Cancellation without panalty fee', () => {
    def('appointment', () => listAppointmentFactory({
      cost: 120,
      startsAt: moment().add(50, 'minutes').toISOString(),
    }))

    hasCorrectCancelMessage(/Don't worry your card won't be charged/)
  })
})
