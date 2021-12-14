import React, { createContext, useState } from 'react'

import useRecentSearchedServices, { IUseRecentSearchedServices } from 'core/hooks/useRecentSearchedServices'

export interface ISearchServicesContext extends IUseRecentSearchedServices {
  searchResults: ICommonService[]
  setSearchResults: (services: ICommonService[]) => void
  showsSuggestions: boolean
  searchBarActive: boolean
  searchQuery: string | undefined
  setShowsSuggestions: (value: boolean) => void
  setSearchBarActive: (value: boolean) => void
  setSearchQuery: (value?: string) => void
}

type FunctionChildren = (context: ISearchServicesContext) => React.ReactNode

interface IParams {
  children: React.ReactNode | FunctionChildren
}

const SearchServices = createContext({} as ISearchServicesContext)

const SearchServicesProvider: React.FC<IParams> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<ICommonService[]>([])
  const [searchBarActive, setSearchBarActive] = useState(false)
  const [showsSuggestions, setShowsSuggestions] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>()

  const recentSearchedServices = useRecentSearchedServices()

  const context = {
    ...recentSearchedServices,
    searchResults,
    setSearchResults,
    searchBarActive,
    searchQuery,
    showsSuggestions,
    setShowsSuggestions,
    setSearchBarActive,
    setSearchQuery,
  }

  return (
    <SearchServices.Provider value={context}>
      { children }
    </SearchServices.Provider>
  )
}

export { SearchServicesProvider }

export default SearchServices
