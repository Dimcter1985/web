import React from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import { def, get, storage, waitFor, appointmentFactory } from 'core/spec'
import { StorageProvider } from 'core/contexts/Storage'
import Appointments from 'core/contexts/Appointments'
import { Statuses } from 'core/consts/appointments'
import Storage from 'utils/storage'
import useRecentAppointment from '../useRecentAppointment'

describe('useRecentAppointment', () => {
  def('context', () => ({
    data: get.appointments,
    total: get.appointments.length,
  }))

  const wrapper: React.FC = ({ children }) => (
    <StorageProvider storage={new Storage(storage, {})}>
      <Appointments.Provider value={get.context}>
        {children}
      </Appointments.Provider>
    </StorageProvider>
  )

  def('subject', () => renderHook(useRecentAppointment, { wrapper }))

  describe('Without appointmets', () => {
    def('appointments', () => [])

    it('has correct initial state', async () => {
      const { result } = get.subject

      await act(async () => {
        await waitFor(() => {
          expect(result.current.appointment).toBeFalsy()
          expect(result.current.inProgress).toBe(false)
          expect(result.current.status).toBe('')
          expect(typeof result.current.hide).toEqual('function')
        })
      })
    })
  })

  describe('With appointmets', () => {
    describe('Upcoming', () => {
      def('appointments', () => [appointmentFactory({ id: 1, status: Statuses.BOOKED })])

      it('returns appointment, in progress and status', async () => {
        const { result } = get.subject

        await act(async () => {
          await waitFor(() => {
            expect(result.current.appointment).toEqual(get.appointments[0])
            expect(result.current.inProgress).toBe(false)
            expect(result.current.status).toEqual('UPCOMING')
          })
        })
      })
    })

    describe('In progress', () => {
      def('appointments', () => [
        appointmentFactory({ status: Statuses.BOOKED }),
        appointmentFactory({ status: Statuses.DONE }),
        appointmentFactory({ status: Statuses.IN_PROGRESS }),
      ])

      it('returns appointment, in progress and status', async () => {
        const { result } = get.subject

        await act(async () => {
          await waitFor(() => {
            expect(result.current.appointment).toEqual(get.appointments[2])
            expect(result.current.inProgress).toBe(true)
            expect(result.current.status).toEqual('IN PROGRESS')
          })
        })
      })
    })

    describe('Past', () => {
      def('appointments', () => [
        appointmentFactory({ status: Statuses.DONE }),
        appointmentFactory({ status: Statuses.BOOKED }),
      ])

      it('returns appointment, in progress and status', async () => {
        const { result } = get.subject

        await act(async () => {
          await waitFor(() => {
            expect(result.current.appointment).toEqual(get.appointments[0])
            expect(result.current.inProgress).toBe(false)
            expect(result.current.status).toEqual('HOW WAS YOUR APPOINTMENT?')
          })
        })
      })
    })
  })
})
