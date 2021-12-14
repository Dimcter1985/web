import { act, renderHook } from '@testing-library/react-hooks'

import fetchAppointments from 'core/api/appointments/fetchAppointments'
import { AppointmentSortBy, SortDirections } from 'core/consts/sorting'
import { def, get, listAppointmentFactory, waitFor } from 'core/spec'
import { Statuses } from 'core/consts/appointments'
import useAppointmentsList from '../useAppointmentsList'

jest.mock('core/api/appointments/fetchAppointments', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useAppointmentsList', () => {
  def('subject', () => renderHook(() => useAppointmentsList({
    statuses: get.statuses,
    sort: get.sort,
  })))

  const service1 = listAppointmentFactory({ id: 1 })
  const service2 = listAppointmentFactory({ id: 2 })

  const appointments = [service1, service2]

  beforeEach(() => {
    jest.clearAllMocks()
    // @ts-ignore
    fetchAppointments.mockResolvedValue({
      data: get.response || [],
      total: (get.response || []).length,
    })
  })

  describe('Without appointments', () => {
    it('has correct initial state', async () => {
      await act(async () => {
        await waitFor(() => {
          const { data, removeFromList } = get.subject.result.current
          expect(data).toEqual([])
          expect(typeof removeFromList).toEqual('function')
        })
      })
    })
  })

  describe('With appointments', () => {
    def('response', () => appointments)

    it('has correct initial state', async () => {
      await act(async () => {
        await waitFor(() => {
          const { data, removeFromList } = get.subject.result.current
          expect(fetchAppointments).toBeCalledTimes(1)
          expect(data).toEqual(appointments)
          expect(typeof removeFromList).toEqual('function')
        })
      })
    })

    it('remomes appointment from the list', async () => {
      await act(async () => {
        await waitFor(() => {
          const { result } = get.subject
          expect(result.current.data.length).toEqual(2)

          act(() => { result.current.removeFromList(service1) })
          expect(result.current.data).toEqual([service2])
        })
      })
    })
  })

  describe('With statuses', () => {
    def('statuses', () => [Statuses.BOOKED, Statuses.DONE])

    it('fetches appointments with correct statuses', async () => {
      await act(async () => {
        await waitFor(() => {
          get.subject.result.current
          expect(fetchAppointments).toBeCalledTimes(1)
          expect(fetchAppointments).toBeCalledWith({
            filters: { statuses: get.statuses },
            pagination: { page: 1, size: 20 },
          })
        })
      })
    })
  })

  describe('With sort', () => {
    def('sort', () => ({
      sortBy: AppointmentSortBy.STARTS_AT,
      order: SortDirections.ASC,
    }))

    it('fetches appointments with correct sort', async () => {
      await act(async () => {
        await waitFor(() => {
          get.subject.result.current
          expect(fetchAppointments).toBeCalledTimes(1)
          expect(fetchAppointments).toBeCalledWith({
            filters: { statuses: [] },
            sort: get.sort,
            pagination: { page: 1, size: 20 },
          })
        })
      })
    })
  })
})
