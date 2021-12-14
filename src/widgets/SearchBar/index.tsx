import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'

import useRouter from 'hooks/useRouter'
import { SEARCH_PATH } from 'consts/pages'
import isEnterKey from 'utils/isEnterKey'
import useApi from 'core/hooks/useApi'
import fetchSalons from 'core/api/salons/fetchSalons'
import useGeolocation from 'core/hooks/useGeolocation'
import fetchSearchPages from 'api/fetchSearchPages'
import useVisibility from 'hooks/useVisibility'
import useMediaQueries from 'hooks/useMediaQueries'
import useLoading from 'hooks/useLoading'
import { SortDirections } from 'core/consts/sorting'
import RouterLink from 'components/RouterLink'
import DialogWithMobileHeader from 'components/DialogWithMobileHeader'

import Container from './components/Container'
import SearchButton from './components/SearchButton'
import OptionsList from './components/OptionsList'
import TextInput from './components/TextInput'
import DrawerTextInput from './components/DrawerTextInput'
import { SALONS_QUERY_FIELDS } from './consts'

import styles from './searchbar.module.scss'

interface IClasses {
  root?: string
  input?: string
}

interface IProps {
  classes?: IClasses
  initialValue?: string
  featuredServices?: IService[]
  visibleSearchBtnOnMobile?: boolean
}

export interface ISalonOption {
  id: number
  name: string
  slug: string
  type: 'salon'
  location: ILocation
}

export interface IServiceOption {
  id: number
  name: string
  slug?: string
  type: 'service'
}

export type ISearchOption = ISalonOption | IServiceOption

export interface ISearchGroup<T = ISearchOption> {
  name: string
  noItemsText: string
  options: T[]
}

export type ISearchOptions = [ISearchGroup<IServiceOption>, ISearchGroup<ISalonOption>]

const buildSearchUrl = (query: string): string => `${SEARCH_PATH}/${query}`
const buildServiceWithoutSlugUrl = (name: string) => {
  const result = name.toLowerCase().replace(/[^a-z0-9\-_]+/g, '-')
  const start = result[0] === '-' ? 1 : 0
  const end = result[result.length-1] === '-' ? result.length - 1 : result.length
  return result.slice(start, end)
}
const buildSalonOrServiceUrl = (slug: string): string => `/${slug}`

const pagination = { page: 1, size: 5 }
const distanceSort = { sortBy: 'distance', order: SortDirections.ASC }
const placeholder = 'Search for service, salon, location or zip code'

const SearchBar: React.FC<IProps> = ({
  classes,
  initialValue,
  featuredServices,
  visibleSearchBtnOnMobile,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { visible, show, hide } = useVisibility(false)
  const { visible: isDrawerOpen, show: showDrawer, hide: hideDrawer } = useVisibility(false)
  const { loading, start, stop } = useLoading()
  const { location } = useGeolocation()
  const { push } = useRouter()
  const { isSmallScreen } = useMediaQueries()

  const { data: initialSalonsData, loading: initialSalonsLoading, fetch: fetchInitialSalons } = useApi(fetchSalons)
  const { data: servicesData, fetch: fetchSearchServices } = useApi(fetchSearchPages)
  const { data: salonsData, fetch: fetchSearchSalons } = useApi(fetchSalons)

  const initialSalons = initialSalonsData?.data || []
  const initialDataLoading = initialSalonsLoading

  const searchServices = servicesData?.data || []
  const searchSalons = salonsData?.data || []
  const searchLoading = loading

  const [ searchValue, setSearchValue ] = useState<string>('')
  const [ opened, setOpened ] = useState<boolean>(false)

  const hasSearch = !!searchValue.length

  const baseOptionsGroup: ISearchOptions = useMemo(() => {

    const baseServicesGroup: ISearchGroup<IServiceOption> = {
      name: 'Popular  Services',
      noItemsText: 'No Popular Services',
      options: (featuredServices || []).map((service) => ({ type: 'service', ...service })),
    }
    
    const baseSalonsGroup: ISearchGroup<ISalonOption> = {
      name: 'Salons Near Me',
      noItemsText: 'No Popular Salons',
      options: initialSalons.map((salon) => ({ ...salon, type: 'salon' })),
    }

    return [ baseServicesGroup, baseSalonsGroup ]
  }, [featuredServices, initialSalons])

  const searchOptionsGroup: ISearchOptions = useMemo(() => {

    const servicesGroup: ISearchGroup<IServiceOption> = {
      name: 'Matching Services',
      noItemsText: 'No services match this search.',
      options: searchServices.map((service) => ({ name: service.h1, type: 'service', ...service })),
    }
    
    const salonsGroup: ISearchGroup<ISalonOption> = {
      name: 'Matching Salons',
      noItemsText: 'No salons match this search.',
      options: searchSalons.map((salon) => ({ ...salon, type: 'salon' })),
    }

    return [ servicesGroup, salonsGroup ]
  }, [searchServices, searchSalons])

  const fetch = useMemo(() => debounce((queryString: string) => {
    Promise.all([
      fetchSearchServices({
        pagination,
        filters: { searchQuery: queryString },
      }),
      fetchSearchSalons({
        queryFields: SALONS_QUERY_FIELDS,
        pagination,
        sort: distanceSort,
        filters: { searchQuery: queryString, ...location },
      }),
    ]).finally(stop)
  }, 500), [fetchSearchServices, fetchSearchSalons, stop, location])

  const onSearchChange = useCallback((event): void => {
    if (!event) { return }
    setSearchValue(event.currentTarget.value)
  }, [])

  const onKeyDown = useCallback((event): void => {
    if (isEnterKey(event)) {
      push(buildSearchUrl(searchValue))
    }
  }, [searchValue])

  const onSelect = useCallback((option: ISearchOption): void => {
    hide()
    setSearchValue(option.name)

    if (option.type === 'service' && !option.slug) {
      push(buildServiceWithoutSlugUrl(option.name))
      return
    }
    push(buildSalonOrServiceUrl(option.slug!))
  }, [hide])

  const onFocus = () => {
    show()
    setOpened(true)
  }

  const onBlur = (): void => {
    setTimeout(() => {
      hide()
    }, 150)
  }

  const onClear = (): void => setSearchValue('')

  const onSearchClick = () => {
    push(buildSearchUrl(searchValue))
  }

  const onDrawerClose = useCallback(() => {
    setSearchValue(initialValue || '')
    hideDrawer()
  }, [initialValue])

  const onPageSearch = useCallback(() => {
    if (!isSmallScreen) { return }
    inputRef.current?.blur()
    showDrawer()
  }, [isSmallScreen, showDrawer])

  useEffect(() => {
    if (!initialValue) { return }
    setSearchValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (!opened) { return }
    fetchInitialSalons({
      queryFields: SALONS_QUERY_FIELDS,
      pagination,
      sort: distanceSort,
      filters: { lat: location.lat, lng: location.lng },
    })
  }, [opened, location])

  useEffect(() => {
    if (!searchValue.length) { return }
    start()
    fetch(searchValue)
  }, [searchValue, fetch])

  return (
    <Container className={classes ? classes.root : undefined}>
      <TextInput
        className={classes ? classes.input : undefined}
        inputRef={inputRef}
        value={searchValue}
        placeholder={placeholder}
        onChange={onSearchChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onClick={onPageSearch}
        hasSearch={hasSearch}
        onClear={onClear}
      />
      <OptionsList
        className={styles.pageOptionsList}
        visible={visible}
        hasSearchValue={hasSearch}
        baseOptionsLoading={initialDataLoading}
        baseOptionsGroup={baseOptionsGroup}
        searchLoading={searchLoading}
        searchOptionsGroup={searchOptionsGroup}
        onSelect={onSelect}
      />
      <DialogWithMobileHeader
        visible={isDrawerOpen}
        onClose={onDrawerClose}
      >
        <DrawerTextInput
          value={searchValue}
          placeholder={placeholder}
          onChange={onSearchChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onClick={onPageSearch}
          hasSearch={hasSearch}
          onClear={onClear}
        />
        <OptionsList
          className={styles.drawerOptionsList}
          visible
          hasSearchValue={hasSearch}
          baseOptionsLoading={initialDataLoading}
          baseOptionsGroup={baseOptionsGroup}
          searchLoading={searchLoading}
          searchOptionsGroup={searchOptionsGroup}
          onSelect={onSelect}
        />
      </DialogWithMobileHeader>
      <SearchButton
        className={styles.searchButton}
        onClick={onSearchClick}
      > 
        Search
      </SearchButton>
      { visibleSearchBtnOnMobile &&
        <RouterLink
          className={styles.searchLink}
          href={SEARCH_PATH}
          variant='touch'
        >
          <SearchButton>
            Search
          </SearchButton>
        </RouterLink>
      }
    </Container>
  )
}

export default SearchBar
