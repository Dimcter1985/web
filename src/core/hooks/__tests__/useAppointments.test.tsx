import React from 'react'
import mockdate from 'mockdate'
import { act, renderHook } from '@testing-library/react-hooks'

import fetchAppointments from 'core/api/appointments/fetchAppointments'
import { AppointmentsProvider } from 'core/contexts/Appointments'
import { appointmentFactory, storage, waitFor } from 'core/spec'
import { StorageProvider } from 'core/contexts/Storage'
import { Statuses } from 'core/consts/appointments'
import App from 'core/contexts/App'
import Storage from 'utils/storage'
import useAppointments, { IUseAppointments } from '../useAppointments'

jest.mock('core/api/appointments/fetchAppointments', () => jest.fn())

afterEach(jest.clearAllMocks)

describe('useAppointments', () => {
  def('appContext', () => ({
    isLogged: get.isLogged,
  }))

  const wrapper: React.FC = ({ children }) => (
    <StorageProvider storage={new Storage(storage, {})}>
      <App.Provider value={get.appContext}>
        <AppointmentsProvider>
          {children}
        </AppointmentsProvider>
      </App.Provider>
    </StorageProvider>
  )

  def('subject', () => renderHook(() => useAppointments(), { wrapper }))

  it('has correct initial state', () => {
    const { data, loading } = get.subject.result.current as IUseAppointments

    expect(data).toEqual([])
    expect(loading).toEqual(false)
  })

  describe('Without user', () => {
    def('isLogged', () => false)

    it('doesnt fetch appointmetns', async () => {
      expect(get.subject).toBeTruthy()
      await act(async () => {
        await waitFor(() => {
          expect(fetchAppointments).not.toBeCalled()
        })
      })
    })
  })

  describe('With user', () => {
    def('isLogged', () => true)

    def('upcomingAppointment', () => appointmentFactory({
      status: Statuses.BOOKED,
      startsAt: new Date('December 2, 2020 10:00:00').toISOString(),
    }))

    def('inProgressAppointment', () => appointmentFactory({
      status: Statuses.IN_PROGRESS,
      startsAt: new Date('December 1, 2020 10:00:00').toISOString(),
    }))

    def('response', () => ({
      data: [get.upcomingAppointment, get.inProgressAppointment],
      total: 2,
    }))

    beforeEach(() => {
      (fetchAppointments as any).mockResolvedValue(get.response)
    })

    it('fetches user appointmets', async () => {
      expect(get.subject).toBeTruthy()

      await act(async () => {
        await waitFor(() => {
          expect(fetchAppointments).toBeCalled()
        })
      })

      const { upcomingAppointment, inProgressAppointment } = get.subject.result.current as IUseAppointments

      mockdate.set('December 1, 2020 10:00:00')
      expect(upcomingAppointment).toEqual(get.upcomingAppointment)
      expect(inProgressAppointment).toEqual(get.inProgressAppointment)
      mockdate.reset()
    })

    it('gets appointments for a specific date', async () => {
      expect(get.subject).toBeTruthy()

      await act(async () => {
        await waitFor(() => {
          const { data, getAppointmentsForDate } = get.subject.result.current as IUseAppointments
          const date = new Date().toISOString()

          mockdate.set('December 2, 2020 8:00:00')

          expect(data.length).toBeGreaterThan(0)
          expect(getAppointmentsForDate(date)).toEqual(
            [get.upcomingAppointment]
          )
          mockdate.reset()
        })
      })
    })
  })
})
