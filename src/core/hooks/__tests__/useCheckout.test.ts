import { renderHook, act } from '@testing-library/react-hooks'

import createAppointment from 'core/api/appointments/createAppointment'
import updateAppointment from 'core/api/appointments/updateAppointment'
import { def } from 'spec'
import useCheckout, { IUseCheckout } from '../useCheckout'

jest.mock('core/api/appointments/createAppointment', () => jest.fn())
jest.mock('core/api/appointments/updateAppointment', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useCheckout', () => {
  def('params', () => ({
    salon: { tipping: get.tipping },
  }))

  def('subject', () => renderHook(() => useCheckout(get.params)))

  it('has correct initial values', () => {
    const { bookAppointment, updateAppointment, submitting } = get.subject.result.current as IUseCheckout
    expect(typeof bookAppointment).toEqual('function')
    expect(typeof updateAppointment).toEqual('function')
    expect(submitting).toEqual(false)
  })

  describe('Check tipping', () => {
    describe('Salon with tipping', () => {
      def('tipping', () => true)

      it('raises tipping error', async () => {
        const { result } = get.subject
        try {
          await act (async () => {
            await result.current.bookAppointment({})
          })
        } catch (error) {
          expect(error).toHaveProperty('message', 'Please, select tip')
        }
      })

      it('doesnt raise tipping error and invokes api function', async() => {
        const { result } = get.subject

        await act (async () => {
          await result.current.bookAppointment({ tipIndex: 1 })
          expect(createAppointment).toBeCalled()
        })

        await act (async () => {
          await result.current.updateAppointment({ id: 2 })
          expect(updateAppointment).toBeCalled()
        })
      })
    })

    describe('Salon without tipping', () => {
      def('tipping', () => false)

      it('doesnt raise tipping error and invokes api function', async() => {
        const { result } = get.subject

        await act (async () => {
          await result.current.bookAppointment({})
          expect(createAppointment).toBeCalled()
        })
      })
    })
  })
})
