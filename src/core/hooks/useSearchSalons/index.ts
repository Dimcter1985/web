import { useCallback, useMemo } from 'react'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import { SortDirections, SalonsSortBy } from 'core/consts/sorting'
import fetchFreeSlots from 'core/api/services/fetchFreeSlots'
import formatDate from 'core/utils/dateTime/formatDate'
import fetchSalons from 'core/api/salons/fetchSalons'
import getBookServices from './utils/getBookServices'
import useGeolocation from '../useGeolocation'
import getSlots from './utils/getSlots'
import useList from '../useList'

export interface IExtendedTimeSlot extends IAvailableTimeSlot {
  date: Date
}

export interface ISearchedSalon {
  salon: IListSalon
  bookServices?: IBookFormService<IService>[]
  slots?: IExtendedTimeSlot[]
}

export interface IUseSearchSalons {
  loadMore: () => void
  salons: ISearchedSalon[]
  loading: boolean
  loadingMore: boolean
  applySearch: (searchQuery: string) => void
  applyFiltersWithSort: (values: IFiltersValues) => void
}

interface IParams {
  services?: IBookFormService<ICommonService>[]
  startsAt?: Date
}

const useSearchSalons = ({ services, startsAt }: IParams = {}): IUseSearchSalons => {
  const { location } = useGeolocation()

  const { DISTANCE } = SalonsSortBy
  const { DESC } = SortDirections

  const api = services ? fetchFreeSlots : fetchSalons

  const initialFilters = services && startsAt
    ? {
      serviceIds: services.map(({ service: { id } }) => id),
      startsAt: formatDate(startsAt, 'YYYY-MM-DDTHH:mm:ss'),
      ...location,
    }
    : {}

  const initialSort = services
    ? { order: SortDirections.ASC, sortBy: SalonsSortBy.DISTANCE }
    : undefined

  const {
    loadMore,
    data,
    loading,
    loadingMore,
    set: setSalons,
    applyFilters,
    applyFiltersAndSort,
    applySearch,
  } = useList<IListSalon | IListFreeSlot>(api, { sort: initialSort, filters: initialFilters })

  const salons = useMemo(() => {
    if (services && services.length) {
      return (data as IListFreeSlot[]).map(({ slots, salonServices, ...rest }) => ({
        ...rest,
        bookServices: getBookServices(salonServices, services),
        slots: getSlots(slots, rest.salon),
      }))
    }
    return data.map(salon => ({ salon })) as ISearchedSalon[]
  }, [data, services, getBookServices, getSlots])

  const applyFiltersWithSort = useCallback(({ sortBy, maxDistance, withTipsOnly }: IFiltersValues) => {
    const latLng = (!!sortBy && sortBy === DISTANCE || !!maxDistance) ? location : {}

    const filters = omitBy({
      ...initialFilters,
      maxDistance,
      withTipsOnly,
      ...latLng,
    }, isUndefined)

    setSalons([])
    if (!sortBy) return applyFilters(filters)
    applyFiltersAndSort({ sort: { order: DESC, sortBy }, filters })
  }, [applyFilters, applyFiltersAndSort, initialFilters])

  return {
    loadMore,
    salons,
    loading,
    loadingMore,
    applyFiltersWithSort,
    applySearch,
  }
}

export default useSearchSalons