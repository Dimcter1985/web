import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation CancelAppointment($id: Int!) {
    cancelAppointment(id: $id) {
      data {
        ${queryFields}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IParams {
  queryFields?: string
  id: number
}

const cancelAppointment = <T = IListAppointment>({
  queryFields = LIST_APPOINTMENT_QUERY_FIELDS,
  id,
}: IParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ id } })
)

export default cancelAppointment