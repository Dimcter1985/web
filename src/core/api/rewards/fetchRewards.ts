import { LIST_REWARD_QUERY_FIELDS } from 'core/api/consts/rewards'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Rewards(
    $pagination: Pagination
    $sort: Sort
    $filters: RewardsFilters
  ) {
    rewards(
      pagination: $pagination
      sort: $sort
      filters: $filters
    ) {
      data {
        ${queryFields}
      }
      total
    }
  }
`

interface IParams {
  queryFields?: string
  pagination?: IPagination
  sort?: {
    order: ISortDirection
    sortBy: string
  }
  filters?: {
    idIn: number[]
  }
}

const fetchRewards = <T = IListReward>({
  queryFields = LIST_REWARD_QUERY_FIELDS,
  ...params
}: IParams = {}): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchRewards
