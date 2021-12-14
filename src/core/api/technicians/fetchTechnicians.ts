import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Technicians(
    $pagination: Pagination
    $filters: TechniciansFilters!
  ) {
    technicians(
      pagination: $pagination
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
  queryFields: string
  pagination?: IPagination
  filters?: {
    searchDate?: string
    serviceIds?: number[]
    salonId: number
    appointmentId?: number
    additionalDuration?: number
  }
}

const fetchTechnicians = <T>({ queryFields, ...params }: IParams): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({ query: query(queryFields), ...params })
)

export default fetchTechnicians