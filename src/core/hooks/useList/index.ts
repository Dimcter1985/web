import { useCallback, useEffect, useReducer, useMemo, useRef } from 'react'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'

import createListReducer from './reducers/listReducer'
import useApi from '../useApi'
import {
  ApiFunction,
  IUseListFilters,
  IUseListSort,
  IUseFiltersAndSort,
} from './types'

export interface IUseList<T> {
  data: T[]
  loading: boolean
  loaded: boolean
  error: Error | null
  noMore: boolean
  loadingMore: boolean
  page: number
  total: number
  applyFilters: (filters: IUseListFilters) => void
  applySort: (sort: IUseListSort) => void
  applyFiltersAndSort: (params: IUseFiltersAndSort) => void
  applySearch: (query: string | undefined) => void
  applyPage: (page: number) => void
  start: () => void
  loadMore: () => void
  refresh: () => void
  clear: () => void
  // removeItem: (finder: (item: T) => boolean) => void
  set: (newData: T[]) => void
}

export interface IUseListOptions<T> {
  filters?: IUseListFilters
  sort?: IUseListSort
  perPage?: number
  searchQuery?: string
  queryFields?: string
  params?: Record<string, any>
  ready?: boolean
  infinity?: boolean
  initialData?: IResponseWithTotal<T>
}

function useList<T>(
  api: ApiFunction,
  {
    filters: initialFilters = {},
    sort: initialSort,
    searchQuery: initialSearchQuery,
    perPage = 20,
    params = {},
    ready: readyOnStart = true,
    initialData,
    infinity = false,
    ...apiParams
  }: IUseListOptions<T> = {},
): IUseList<T> {

  const initialState = useMemo(() => ({
    data: initialData?.data || [],
    total: initialData?.total || 0,
    noMore: false,
    filters: initialFilters,
    sort: initialSort,
    page: 1,
    searchQuery: initialSearchQuery,
    ready: false,
    refreshValue: 0,
  }), [])

  const isFirstRun = useRef<boolean>(!!initialData)
  const listReducer = createListReducer<T>()
  const [ state, dispatch ] = useReducer(listReducer, initialState)
  const { data, total, noMore, filters, sort, page, ready, searchQuery } = state

  const handleRecivedData = useCallback(({ data: payload, total: payloadTotal }: IResponseWithTotal<T>) => {
    dispatch({
      type: 'setPayload',
      data: (page === 1 || !infinity) ? payload : [...data, ...payload],
      noMore: payload.length < perPage,
      total: payloadTotal,
    })
  }, [page, data])

  const { loaded, loading, fetch, error } = useApi<IResponseWithTotal<T>>(api, {
    onSuccess: handleRecivedData,
  })

  const applyFilters = useCallback((newFilters: IUseListFilters) => {
    dispatch({ type: 'applyFilters', filters: newFilters })
  }, [])

  const applySort = useCallback((newSort: IUseListSort) => {
    dispatch({ type: 'applySort', sort: newSort })
  }, [])

  const applyFiltersAndSort = useCallback((newFilters: IUseFiltersAndSort) => {
    dispatch({ type: 'applyFiltersAndSort', ...newFilters })
  }, [])

  const applySearch = useCallback((query: string | undefined) => {
    dispatch({ type: 'applySearch', query })
  }, [])

  const applyPage = useCallback((newPage: number) => {
    dispatch({ type: 'applyPage', page: newPage })
  }, [])

  const refresh = useCallback(() => {
    dispatch({ type: 'refresh' })
  }, [])

  const start = useCallback(() => {
    dispatch({ type: 'start', page: ((initialData?.data || []).length > 0) ? 2 : 1 })
  }, [initialData])

  const loadMore = useCallback(() => {
    if (loading || noMore) return
    dispatch({ type: 'loadNext' })
  }, [loading, noMore])

  const setData = useCallback((newData: T[]) => {
    dispatch({ type: 'setData', data: newData })
  }, [])
  
  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  useEffect(() => {
    if (!ready) return
    
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    fetch(
      omitBy(
        {
          ...apiParams,
          ...params,
          pagination: {
            page,
            size: perPage,
          },
          filters: omitBy({
            ...filters,
            searchQuery: searchQuery ?? filters?.searchQuery,
          }, isUndefined),
          sort,
        },
        (v) => isNil(v) || isEmpty(v),
      ),
    )
  }, [JSON.stringify(omit(state, ['data', 'total', 'noMore']))])

  useEffect(() => {
    if (readyOnStart) start()
  }, [])

  return {
    data,
    loading,
    loadingMore: loading && page > 1,
    error,
    loaded,
    page,
    noMore,
    total,
    clear,
    loadMore,
    refresh,
    start,
    applyFilters,
    applySort,
    applyFiltersAndSort,
    applySearch,
    applyPage,
    set: setData,
  }
}

export default useList
