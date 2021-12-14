import { useCallback } from 'react'
import take from 'lodash/take'

import useStorageEntity from './useStorageEntity'

export interface IUseRecentSearchedServices {
  searchedServices: IMinimalService[]
  addSearchedService: (service: IMinimalService) => void
  removeSearchedService: (serviceId: number) => void
}

export const RECENT_SERVICES_STORAGE_KEY = 'recent-search-services'
export const RECENT_SERVICES_LIMIT = 5

const useRecentSearchedServices = (): IUseRecentSearchedServices => {

  const { data, set } = useStorageEntity<IMinimalService[]>(RECENT_SERVICES_STORAGE_KEY)
  const searchedServices = data || []

  const add = useCallback((service: IMinimalService) => {
    set(( services ) => ( [service, ...take((services || []), RECENT_SERVICES_LIMIT - 1)] ))
  }, [set])

  const remove = useCallback((serviceId: number) => {
    set(( services ) => ((services || []).filter((s => s.id !== serviceId)) ))
  }, [set])

  return {
    searchedServices,
    addSearchedService: add,
    removeSearchedService: remove,
  }
}

export default useRecentSearchedServices