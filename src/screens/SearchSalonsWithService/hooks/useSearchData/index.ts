import { useMemo, useEffect, useState } from 'react'
import omit from 'lodash/omit'
import fetchFreeSlots, { IParams } from 'core/api/services/fetchFreeSlots'
import useList from 'core/hooks/useList'
import { SortDirections, FreeSlotsSortBy } from 'core/consts/sorting'
import useSearch from 'hooks/useSearch'
import { IExtendedTimeSlot } from 'types/search'
import { PER_PAGE } from 'contexts/search/consts'
import getSlots from './utils/getSlots'

interface IProps {
  initialData: IResponseWithTotal<IListFreeSlot>
  startsAt: string
}

export interface ISearchedSalon {
  salon: IListSalon
  bookServices: IService[]
  slots: IExtendedTimeSlot[]
}

export type TSortFreeSlots = 'rating' | 'near me'

interface IUseSearchData {
  searchedSalons: ISearchedSalon[]
  sort: TSortFreeSlots
  setSort: (sort: TSortFreeSlots) => void
  applyPage: (page: number) => void
  page: number
  total: number
}

const sortOptions: Record<TSortFreeSlots, IParams['sort']> = {
  'rating': { order: SortDirections.DESC, sortBy: FreeSlotsSortBy.RATING },
  'near me': { order: SortDirections.ASC, sortBy: FreeSlotsSortBy.DISTANCE },
}

const useSearchData = ({ initialData, startsAt }: IProps): IUseSearchData  => {
  const { searchPage, currentMapCenter } = useSearch()
  const [sort, setSort] = useState<TSortFreeSlots>('near me')

  const { data, page, total, applyPage, applyFilters, refresh } = useList<IListFreeSlot>(fetchFreeSlots, {
    initialData,
    perPage: PER_PAGE,
    filters: { serviceIds: [searchPage!.serviceId], startsAt, ...currentMapCenter },
    sort: sortOptions[sort],
  })

  const searchedSalons = useMemo(() => (
    data.map(({ slots, salonServices, ...rest }) => ({
      ...rest,
      bookServices: salonServices.map((service) => ({ ...omit(service, ['services']) })),
      slots: getSlots(slots, rest.salon),
    }))
  ), [data, getSlots])

  useEffect(() => {
    applyFilters({ serviceIds: [searchPage!.serviceId], startsAt, ...currentMapCenter })
    refresh()
  }, [currentMapCenter])

  return ({
    searchedSalons,
    sort,
    setSort,
    applyPage,
    page,
    total,
  })
}

export default useSearchData
