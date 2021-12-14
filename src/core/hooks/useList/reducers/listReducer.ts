import { IUseListAction, IUseListReducerState } from '../types'

const createListReducer = <T>() => (state: IUseListReducerState<T>, action: IUseListAction<T>): IUseListReducerState<T> => {
  switch (action.type) {
    case 'applyFilters':
      return { ...state, filters: action.filters, page: 1 }
    case 'applySort':
      return { ...state, sort: action.sort, page: 1 }
    case 'applyFiltersAndSort':
      return { ...state, ...action, page: 1 }
    case 'applySearch':
      return { ...state, ready: true, searchQuery: action.query, page: 1 }
    case 'applyPage':
      return { ...state, page: action.page }
    case 'loadNext':
      return { ...state, page: state.page + 1 }
    case 'refresh':
      return { ...state, page: 1, ready: true, refreshValue: Date.now() }
    case 'start':
      return { ...state, ready: true, page: 1 }
    case 'setData': 
      return { ...state, data: action.data }
    case 'setPayload':
      return { ...state, data: action.data, total: action.total, noMore: action.noMore }
    case 'clear':
      return { ...state, data: [], total: 0 }
    default:
      return state
  }
}

export default createListReducer
