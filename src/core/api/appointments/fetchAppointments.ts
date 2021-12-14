import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import stringifyDateTime from 'core/utils/dateTime/stringifyDateTime'
import buildQuery from 'core/utils/api/buildQuery'

const query = (queryFields: string): string => `
  query Appointments(
    $pagination: Pagination
    $sort: AppointmentsSort
    $filters: AppointmentsFilters
  ) {
    appointments(
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

interface IAppointmentsFilters {
  salonId?: number
  statuses?: IStatuses
  ids?: number[]
  technicianId?: number
  startsAtLt?: IDate
  startsAtGt?: IDate
  endsAtLt?: IDate
  endsAtGt?: IDate
  createdAtGt?: IDate
  createdAtLt?: IDate
  batch?: AppointmentsBatch
}

interface IParams {
  queryFields?: string
  pagination?: IPagination
  sort?: {
    order: ISortDirection
    sortBy: IAppointmentSortBy
  },
  filters?: IAppointmentsFilters
}

const normalizeFilters = (filters: IAppointmentsFilters | undefined): IAppointmentsFilters => {
  if (!filters) return {}
  return {
    ...filters,
    ...(!!filters.startsAtLt && { startsAtLt: stringifyDateTime(filters.startsAtLt) }),
    ...(!!filters.startsAtGt && { startsAtGt: stringifyDateTime(filters.startsAtGt) }),
    ...(!!filters.endsAtLt && { endsAtLt: stringifyDateTime(filters.endsAtLt) }),
    ...(!!filters.endsAtGt && { endsAtGt: stringifyDateTime(filters.endsAtGt) }),
    ...(!!filters.createdAtGt && { createdAtGt: stringifyDateTime(filters.createdAtGt) }),
    ...(!!filters.createdAtLt && { createdAtLt: stringifyDateTime(filters.createdAtLt) }),
  }
}

const fetchAppointments = <T = IListAppointment>({
  queryFields = LIST_APPOINTMENT_QUERY_FIELDS,
  filters,
  ...params
} = {} as IParams): Promise<IResponseWithTotal<T>> => (
  buildQuery<IResponseWithTotal<T>>({
    query: query(queryFields),
    ...{
      ...params,
      filters: normalizeFilters(filters),
    },
  })
)

export default fetchAppointments