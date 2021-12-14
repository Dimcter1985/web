import { LIST_APPOINTMENT_QUERY_FIELDS } from 'core/api/consts/appointments'
import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = (queryFields: string): string => `
  mutation CreateAppointment($payload: CreateAppointmentInputs!) {
    createAppointment(payload: $payload) {
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

export interface ICreateAppointmentParams {
  queryFields?: string
  salonId: number
  services: IServiceInput[]
  technicianId: number
  cardFingerprintId: number
  startsAt: string
  tip?: number
  referralCode?: string
  credits?: number
  paymentMethodNonce?: string
  discountId?: number
  loyaltyCardId?: number
  deviceType: string
  appVersion: string
  specialRequests?: string
  cvv?: string
}

const createAppointment = <T = IListAppointment>({
  queryFields = LIST_APPOINTMENT_QUERY_FIELDS,
  ...payload
}: ICreateAppointmentParams): Promise<T> => (
  buildMutation<T>({ query: query(queryFields), ...{ payload } })
)

export default createAppointment