import React from 'react'
import moment from 'moment'
import { act, renderHook } from '@testing-library/react-hooks'

import fetchTechnicians from 'core/api/technicians/fetchTechnicians'
import Appointments from 'core/contexts/Appointments'
import {
  commonServiceFactory, def, get, listAppointmentFactory,
  technicianFactory, waitFor,
} from 'core/spec'
import useTimeSlots from '../useTimeSlots'

jest.mock('core/api/technicians/fetchTechnicians', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useTimeSlots', () => {
  def('setTimeSlot', jest.fn)
  def('apptContext', () => ({ data: get.appointments || [] }))

  const wrapper: React.FC = ({ children }) => (
    <Appointments.Provider value={get.apptContext}>
      {children}
    </Appointments.Provider>
  )

  def('subject', () => renderHook(
    () => useTimeSlots({
      salonId: get.salonId,
      appointment: get.appointment,
      date: get.selectedDate || new Date('December 10, 2050'),
      services: get.services || [],
      timeOffset: get.timeOffset,
      timezone: get.timezone,
    }),
    { wrapper }
  ))

  describe('check if selected date is today', () => {
    describe('today', () => {
      def('selectedDate', () => moment().toISOString())

      it('checks selected date', () => {
        const { result } = get.subject
        expect(result.current.isSelectedDateToday).toEqual(true)
      })
    })

    describe('2 days ahead', () => {
      def('selectedDate', () => moment().add(2, 'days').toDate())

      it('checks selected date', () => {
        const { result } = get.subject
        expect(result.current.isSelectedDateToday).toEqual(false)
      })
    })
  })

  describe('has correct available time slots', () => {

    describe('with salon time slots', () => {
      def('salonId', () => 1)
      
      def('services', () => [{
        service: commonServiceFactory({ id: 1 }),
        quantity: 1,
      }])

      beforeEach(() => {
        // @ts-ignore
        fetchTechnicians.mockResolvedValue({
          data: [technicianFactory({
            id: 2,
            timeSlots: [
              '2020-12-20T09:00:00-05:00',
              '2020-12-20T09:30:00-05:00',
              '2020-12-20T09:45:00-05:00',
            ],
          })],
          total: 1,
        })
      })

      it('return correct value', async () => {
        const { result } = get.subject
        await act(async () => {
          await waitFor(() => {
            expect(result.current.availableTimeSlots).toEqual([
              { slot: 540, technicianId: 2 },
              { slot: 570, technicianId: 2 },
              { slot: 585, technicianId: 2 },
            ])
          })
        })
      })
    })
  })

  describe('extract booked times from appointments', () => {
    describe('without selected date', () => {
      def('selectedDate', () => undefined)

      it('returns correct appointment list', () => {
        const { result } = get.subject
        expect(result.current.bookedTimes).toEqual([])
      })
    })

    describe('with selected date and appointments', () => {
      def('appointments', () => [
        listAppointmentFactory({
          startsAt: new Date('December 10, 2020 11:00:00').toISOString(),
          duration: 40,
        }),
        listAppointmentFactory({
          startsAt: new Date('December 10, 2020 17:00:00').toISOString(),
          duration: 30,
        }),
        listAppointmentFactory({
          startsAt: new Date('December 11, 2020 15:00:00').toISOString(),
          duration: 20,
        }),
      ])

      describe('check yesterday`s appointments', () => {
        def('selectedDate', () => new Date('December 9, 2020 10:00:00'))

        it('returns correct value', () => {
          const { result } = get.subject
          expect(result.current.bookedTimes.length).toEqual(0)
        })
      })

      describe('check today`s appointments', () => {
        def('selectedDate', () => new Date('December 10, 2020 10:00:00'))

        it('returns correct value', () => {
          const { result } = get.subject
          expect(result.current.bookedTimes.length).toEqual(2)
        })
      })

      describe('check tomorrow`s appointments', () => {
        def('selectedDate', () => new Date('December 11, 2020 10:00:00'))

        it('returns correct value', () => {
          const { result } = get.subject
          expect(result.current.bookedTimes.length).toEqual(1)
        })
      })
    })
  })
})