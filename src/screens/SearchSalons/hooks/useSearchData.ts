import { useState, useEffect } from 'react'
import useList from 'core/hooks/useList'
import fetchSalons, { IParams } from 'core/api/salons/fetchSalons'
import useSearch from 'hooks/useSearch'
import { SortDirections, SalonsSortBy } from 'core/consts/sorting'

interface IProps {
  initSalons: IResponseWithTotal<IListSalon>
}

export type TSortSalons = 'rating' | 'near me'

interface IUseSearchData {
  salons: IListSalon[]
  sort: TSortSalons
  setSort: (sort: TSortSalons) => void
  applyPage: (page: number) => void
  page: number
  total: number
}

const sortOptions: Record<TSortSalons, IParams['sort']> = {
  'rating': { order: SortDirections.DESC, sortBy: SalonsSortBy.RATING },
  'near me': { order: SortDirections.ASC, sortBy: SalonsSortBy.DISTANCE },
}

const useSearchData = ({ initSalons }: IProps): IUseSearchData => {
  const { searchPage, query, currentMapCenter } = useSearch()
  const [sort, setSort] = useState<TSortSalons>('near me')

  const { data: salons, page, total, applyPage, applyFilters, applySort, refresh } = useList<IListSalon>(fetchSalons, { 
    initialData: initSalons,
    perPage: 10,
    ...( searchPage ? { filters: { searchPageId: searchPage.id } } : { searchQuery: query }),
    sort: sortOptions[sort],
  })

  useEffect(() => {
    applyFilters(searchPage ? { searchPageId: searchPage.id, ...currentMapCenter } : { searchQuery: query, ...currentMapCenter })
    refresh()
  }, [currentMapCenter])

  useEffect(() => {
    applySort(sortOptions[sort]!)
    refresh()
  }, [sort])

  return ({
    salons,
    sort,
    setSort,
    applyPage,
    page,
    total,
  })

}

export default useSearchData
