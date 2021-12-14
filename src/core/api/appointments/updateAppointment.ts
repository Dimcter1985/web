import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation UpdateAppointment($payload: UpdateAppointmentInputs!) {
    updateAppointment(payload: $payload) {
      data {
        ${queryFields}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IServiceInput {
  serviceId: number
  quantity: number
}

interface ICustomServiceInput {
  name: string
  cost: number
  duration?: number
}

export interface IUpdateAppointmentParams {
  queryFields?: string
  id: number
  startsAt?: string
  services?: IServiceInput[]
  discountId?: number
  credits?: number
  tip?: number
  referralCode?: string
  loyaltyCardId?: number
  technicianId?: number
  customServices?: ICustomServiceInput[]
  specialRequests?: string
  cardFingerprintId?: number
  cvv?: string
}

const updateAppointment = <T = IListAppointment>({
  queryFields = LIST_APPOINTMENT_QUERY_FIELDS,
  ...payload
}: IUpdateAppointmentParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ payload } })
)

export default updateAppointment