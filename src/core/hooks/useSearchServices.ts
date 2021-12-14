import { useCallback, useContext } from 'react'

import SearchServices, { ISearchServicesContext } from 'core/contexts/SearchServices'
import useServices from './useServices'

interface IUseSearchServices extends ISearchServicesContext {
  submitSearch: (searchQuery?: string) => void
}

const useSearchServices = (): IUseSearchServices => {
  const { services } = useServices()
  const searchServices = useContext(SearchServices)

  const { showsSuggestions, setSearchQuery, setShowsSuggestions, setSearchResults } = searchServices

  const submitSearch = useCallback((searchQuery?: string) => {
    setSearchQuery(searchQuery)
    if (!searchQuery) return setSearchResults([])
    const searchRegExp = new RegExp(`\\b${searchQuery}`, 'ig')
    const searchResults = services.filter((s) => s.name.match(searchRegExp))
    setSearchResults(searchResults)
  }, [services, showsSuggestions, setShowsSuggestions, setSearchResults])

  return {
    ...searchServices,
    submitSearch,
  }
}

export default useSearchServices