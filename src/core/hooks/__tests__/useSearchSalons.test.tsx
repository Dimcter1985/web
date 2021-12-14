import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import omit from 'lodash/omit'

import {
  bookFormServiceFactory, freeSlotSalonServiceFactory,
  freeSlotsFactory, geolocation, salonServiceFactory, waitFor,
} from 'core/spec'
import { SalonsSortBy, SortDirections } from 'core/consts/sorting'
import { GeolocationProvider } from 'core/contexts/Geolocation'
import fetchFreeSlots from 'core/api/services/fetchFreeSlots'
import formatDate from 'core/utils/dateTime/formatDate'
import fetchSalons from 'core/api/salons/fetchSalons'
import { DEFAULT_POSITION } from 'core/consts'
import { StorageProvider } from 'core/contexts/Storage'

import useSearchSalons, { IUseSearchSalons } from '../useSearchSalons'


jest.mock('core/api/salons/fetchSalons', () => jest.fn())
jest.mock('core/api/services/fetchFreeSlots', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useSearchSalons', () => {
  def('storage', () => ({
    getItem: () => Promise.resolve(null),
  }))

  const wrapper: React.FC = ({ children }) => (
    <StorageProvider storage={get.storage}>
      <GeolocationProvider geolocation={geolocation}>
        {children}
      </GeolocationProvider>
    </StorageProvider>
  )

  def('subject', () => renderHook(() => useSearchSalons(get.searchSalonsParams), { wrapper }))

  beforeEach(() => {
    // @ts-ignore
    fetchSalons.mockResolvedValue({ data: get.salons || [], total: 0 })
    // @ts-ignore
    fetchFreeSlots.mockResolvedValue({ data: get.freeSlots || [], total: 0 })
  })

  const pagination = { page: 1, size: 20 }

  describe('With services', () => {
    def('searchSalonsParams', () => ({
      services: [bookFormServiceFactory({
        service: salonServiceFactory({ id: 1 }),
        quantity: 3,
      })],
      startsAt: new Date().toISOString(),
    }))

    it('invokes correct api function', async () => {
      get.subject
      await act(async () => {
        await waitFor(() => {
          expect(fetchFreeSlots).toBeCalledWith({
            sort: {
              order: SortDirections.ASC,
              sortBy: SalonsSortBy.DISTANCE,
            },
            filters: {
              serviceIds: [1],
              startsAt: formatDate(get.searchSalonsParams.startsAt, 'YYYY-MM-DDTHH:mm:ss'),
              ...DEFAULT_POSITION,
            },
            pagination,
          })
          expect(fetchSalons).not.toBeCalled()
        })
      })
    })

    it('applies additional filters', async () => {
      const { result } = get.subject

      act(() => {
        result.current.applyFiltersWithSort({
          maxDistance: 1,
          withTipsOnly: true,
        })
      })

      await act(async () => {
        await waitFor(() => {
          expect(fetchFreeSlots).toBeCalledWith({
            sort: {
              order: SortDirections.ASC,
              sortBy: SalonsSortBy.DISTANCE,
            },
            filters: {
              serviceIds: [1],
              startsAt: formatDate(get.searchSalonsParams.startsAt, 'YYYY-MM-DDTHH:mm:ss'),
              maxDistance: 1,
              withTipsOnly: true,
              ...DEFAULT_POSITION,
            },
            pagination,
          })
          expect(fetchSalons).not.toBeCalled()
        })
      })
    })

    describe('', () => {
      const slot1 = '2020-12-02T10:00:00-05:00'
      const slot2 = '2020-12-02T11:00:00-05:00'
      const slot3 = '2020-12-02T12:00:00-05:00'

      const salonService1 = freeSlotSalonServiceFactory({ services: [{ id: 1 }] })

      const freeSlots = freeSlotsFactory({
        salonServices: [salonService1],
        slots: [
          {
            slots: [slot1, slot2],
            technicianId: 1,
          },
          {
            slots: [slot1, slot3],
            technicianId: 2,
          },
        ]
      })

      def('freeSlots', () => [freeSlots])

      it('returns correct data', async () => {
        await act(async () => {
          const { result } = get.subject
          await waitFor(() => {
            expect(result.current.salons).toEqual([
              {
                salon: freeSlots.salon,
                bookServices: [{
                  service: omit(salonService1, 'services'),
                  quantity: 3,
                }],
                slots: [
                  {
                    date: slot1,
                    slot: 600,
                    technicianId: 1,
                  },
                  {
                    date: slot2,
                    slot: 660,
                    technicianId: 1,
                  },
                  {
                    date: slot3,
                    slot: 720,
                    technicianId: 2,
                  },
                ],
              },
            ])
          })
        })
      })
    })
  })

  it('has correct initial state', async () => {
    const { loadMore, salons, applyFiltersWithSort, applySearch } = get.subject.result.current as IUseSearchSalons

    await act(async () => {
      await waitFor(() => {
        expect(typeof loadMore).toEqual('function')
        expect(typeof applyFiltersWithSort).toEqual('function')
        expect(typeof applySearch).toEqual('function')
        expect(salons).toEqual([])
      })
    })
  })

  it('applies search', async () => {
    const { applySearch } = get.subject.result.current as IUseSearchSalons

    act(() => { applySearch('Leadbelly') })

    await act(async () => {
      await waitFor(() => {
        expect(fetchSalons).toBeCalledWith({
          pagination,
          filters: { searchQuery: 'Leadbelly' }
        })
      })
    })
  })

  it('applies sort', async () => {
    const { applyFiltersWithSort } = get.subject.result.current as IUseSearchSalons

    act(() => { applyFiltersWithSort({ sortBy: SalonsSortBy.RATING }) })

    await act(async () => {
      await waitFor(() => {
        expect(fetchSalons).toBeCalledWith({
          pagination,
          sort: {
            order: SortDirections.DESC,
            sortBy: SalonsSortBy.RATING,
          },
        })
      })
    })
  })

  describe('With `max distance` filter', () => {
    it('applies sort and filters', async () => {
      const { applyFiltersWithSort } = get.subject.result.current as IUseSearchSalons

      act(() => {
        applyFiltersWithSort({
          sortBy: SalonsSortBy.RATING,
          maxDistance: 1,
        })
      })

      await act(async () => {
        await waitFor(() => {
          expect(fetchSalons).toBeCalledWith({
            pagination,
            sort: {
              order: SortDirections.DESC,
              sortBy: SalonsSortBy.RATING,
            },
            filters: {
              maxDistance: 1,
              ...DEFAULT_POSITION,
            }
          })
        })
      })
    })
  })

  describe('With `tips only` filter', () => {
    it('applies sort and filters', async () => {
      const { applyFiltersWithSort } = get.subject.result.current as IUseSearchSalons

      act(() => {
        applyFiltersWithSort({ withTipsOnly: true })
      })

      await act(async () => {
        await waitFor(() => {
          expect(fetchSalons).toBeCalledWith({
            pagination,
            filters: { withTipsOnly: true },
          })
        })
      })
    })
  })

  describe('With `distance` sort', () => {
    it('applies sort and filters', async () => {
      const { applyFiltersWithSort } = get.subject.result.current as IUseSearchSalons

      act(() => {
        applyFiltersWithSort({ sortBy: SalonsSortBy.DISTANCE })
      })

      await act(async () => {
        await waitFor(() => {
          expect(fetchSalons).toBeCalledWith({
            pagination,
            sort: {
              order: SortDirections.DESC,
              sortBy: SalonsSortBy.DISTANCE,
            },
            filters: {
              ...DEFAULT_POSITION,
            }
          })
        })
      })
    })
  })
})
