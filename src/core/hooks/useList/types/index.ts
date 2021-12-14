export type ApiFunction = (params: any) => Promise<IResponseWithTotal<any>>

export interface IUseListFilters {
  [key: string]: any
}

export interface IUseListSort {
  order: ISortDirection
  sortBy: string
}

export interface IUseFiltersAndSort {
  filters: IUseListFilters
  sort: IUseListSort
}

export interface IUseListReducerState<T> {
  data: T[]
  noMore: boolean
  total: number
  page: number
  sort: IUseListSort | undefined
  filters: IUseListFilters | undefined
  searchQuery: string | undefined
  ready: boolean
  refreshValue: number
}

export type ApplyFiltersAction = {
  type: 'applyFilters'
  filters: IUseListFilters
}

export type ApplySortAction = {
  type: 'applySort'
  sort: IUseListSort | undefined
}

export type ApplyFiltersAndSortAction = {
  type: 'applyFiltersAndSort'
} & IUseFiltersAndSort

export type ApplySearchAction = {
  type: 'applySearch'
  query: string | undefined
}

export type ApplyPageAction = {
  type: 'applyPage'
  page: number
}

export type LoadNextAction = {
  type: 'loadNext'
}

export type RefreshAction = {
  type: 'refresh'
}

export type StartAction = {
  type: 'start'
  page: number
}

export type SetDataAction<T> = {
  type: 'setData'
  data: T[]
}

export type SetPayloadAction<T> = {
  type: 'setPayload'
  data: T[]
  total: number
  noMore: boolean
}

export type ClearAction = {
  type: 'clear'
}

export type IUseListAction<T> =
  | ApplyFiltersAction
  | ApplySortAction 
  | ApplyFiltersAndSortAction 
  | ApplySearchAction
  | RefreshAction
  | LoadNextAction
  | StartAction 
  | ApplyPageAction
  | SetDataAction<T>
  | SetPayloadAction<T>
  | ClearAction
