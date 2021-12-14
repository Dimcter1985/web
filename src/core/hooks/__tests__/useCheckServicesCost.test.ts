import { renderHook } from '@testing-library/react-hooks'

import useCheckServicesCost, { DECREASE_COST_MESSAGE } from '../useCheckServicesCost'
import {
  appointmentServiceFactory, bookFormServiceFactory,
  customServiceFactory, def, get, listAppointmentFactory,
  salonServiceFactory,
} from 'core/spec'

describe('useCheckServicesCost', () => {
  def('onSuccess', jest.fn)
  def('onException', jest.fn)

  def('appointment', () => listAppointmentFactory({
    appointmentServices: [
      appointmentServiceFactory({ cost: 20 }),
      appointmentServiceFactory({ cost: 50 }),
    ],
    customServices: [
      customServiceFactory({ cost: 70 }),
      customServiceFactory({ cost: 90 }),
    ],
  }))

  def('subject', () => renderHook(() => (
    useCheckServicesCost({
      appointment: get.appointment,
      onSuccess: get.onSuccess,
      onException: get.onException,
    }))
  ))

  const makeBookFormService = (cost: number): IBookFormService => (
    bookFormServiceFactory({ service: salonServiceFactory({ cost })})
  )

  describe('With exception', () => {
    def('bookFormValues', () => ({
      services: [
        makeBookFormService(20),
        makeBookFormService(40),
      ],
      customServices: get.appointment.customServices,
    }))

    it('checks cost and submits an exception message', () => {
      get.subject.result.current.checkCost(get.bookFormValues)
      expect(get.onSuccess).not.toBeCalled()
      expect(get.onException).toBeCalledWith(DECREASE_COST_MESSAGE, get.bookFormValues)
    })
  })

  describe('Without exception', () => {
    def('bookFormValues', () => ({
      services: [
        makeBookFormService(20),
      ],
      customServices: [
        customServiceFactory({ cost: 50 }),
        customServiceFactory({ cost: 60 }),
        customServiceFactory({ cost: 100 }),
      ],
    }))

    it('checks cost and submits without an exception message', () => {
      get.subject.result.current.checkCost(get.bookFormValues)
      expect(get.onSuccess).toBeCalledWith(get.bookFormValues)
      expect(get.onException).not.toBeCalled()
    })
  })
})
