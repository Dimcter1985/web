import { createContext, useState, useCallback, useEffect } from 'react'
import noop from 'lodash/noop'

import useRouterParams from 'hooks/useRouterParams'
import useVisibility from 'hooks/useVisibility'
import useMediaQueries from 'hooks/useMediaQueries'
import { ISearchPage } from 'api/fetchSearchPage'
import { DEFAULT_POSITION } from 'core/consts'
import useGeolocation from 'core/hooks/useGeolocation'

interface IRouterParams {
  query?: string
}

interface IProps {
  searchPage?: ISearchPage
  featuredServices?: IService[]
}

export interface IContext {
  query?: string
  searchPage: ISearchPage | null
  followMapCenter: boolean
  currentMapCenter: ILocation
  featuredServices?: IService[]
  visibleMobileSort: boolean
  visibleList: boolean
  visibleMap: boolean
  toggleMobileSort: () => void
  toggleList: () => void
  toggleFollowMapCenter: () => void
  hoverSalonId: number | null
  setHoverSalonId: (id: number | null) => void
  setCurrentMapCenter: (location: ILocation) => void
}

const Context = createContext<IContext>({
  searchPage: null,
  followMapCenter: false,
  currentMapCenter: DEFAULT_POSITION,
  featuredServices: undefined,
  visibleMobileSort: false,
  visibleList: true,
  visibleMap: false,
  toggleMobileSort: noop,
  toggleList: noop,
  toggleFollowMapCenter: noop,
  hoverSalonId: null,
  setHoverSalonId: noop,
  setCurrentMapCenter: noop,
})

const SearchProvider: React.FC<IProps> = ({ searchPage = null, featuredServices, children }) => {
  const { query } = useRouterParams<IRouterParams>()
  const { location } = useGeolocation()
  const { isSmallScreen } = useMediaQueries()
  const [followMapCenter, setFollowMapCenter] = useState(false)
  const [currentMapCenter, setCurrentMapCenter] = useState<ILocation>(location)
  const [hoverSalonId, setHoverSalonId] = useState<number | null>(null)
  const { visible: visibleMobileSort, show: showMobileSort, hide: hideMobileSort } = useVisibility(false)
  const { visible: visibleList, show: showList, hide: hideList } = useVisibility(true)
  const visibleMap = !isSmallScreen || !visibleList

  const toggleFollowMapCenter = useCallback(() => {
    setFollowMapCenter((prev) => !prev)
  }, [setFollowMapCenter])

  const toggleList = useCallback(() => {
    if (visibleList) {
      hideList()
    } else {
      showList()
    }
  }, [visibleList, hideList, showList])

  const toggleMobileSort = useCallback(() => {
    if (visibleMobileSort) {
      hideMobileSort()
    } else {
      showMobileSort()
    }
  }, [visibleMobileSort, hideMobileSort, showMobileSort])

  useEffect(() => {
    if (isSmallScreen) { return }
    showList()
    hideMobileSort()
  }, [isSmallScreen])

  const value: IContext = {
    query,
    searchPage,
    followMapCenter,
    currentMapCenter,
    featuredServices,
    visibleMobileSort,
    visibleList,
    visibleMap,
    toggleMobileSort,
    toggleList,
    toggleFollowMapCenter,
    hoverSalonId,
    setHoverSalonId,
    setCurrentMapCenter,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export { SearchProvider }

export default Context
