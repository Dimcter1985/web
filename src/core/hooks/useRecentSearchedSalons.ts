import { useCallback } from 'react'
import take from 'lodash/take'

import useStorageEntity from './useStorageEntity'

export interface IUseRecentSearchedSalons {
  salons: ISearchSalonItem[]
  add: (salon: ISearchSalonItem) => void
  remove: (salonId: number) => void
}

export const RECENT_SALONS_STORAGE_KEY = 'recent-salons-services'
export const RECENT_SERVICES_LIMIT = 5

const useRecentSearchedSalons = (): IUseRecentSearchedSalons => {

  const { data, set } = useStorageEntity<ISearchSalonItem[]>(RECENT_SALONS_STORAGE_KEY)

  const add = useCallback((salon: ISearchSalonItem) => {
    set(( salons ) => ( [salon, ...take((salons || []), RECENT_SERVICES_LIMIT - 1)] ))
  }, [set])

  const remove = useCallback((salonId: number) => {
    set(( salons ) => ((salons || []).filter((s => s.id !== salonId)) ))
  }, [set])

  return { salons: data || [], add, remove }
}

export default useRecentSearchedSalons