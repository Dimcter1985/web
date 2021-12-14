import { LIST_SALON_QUERY_FIELDS } from './salon'

export const APPOINTMENT_SERVICES_QUERY_FIELDS = `
  id
  cost
  name
  quantity
  salonServiceId
`

export const APPOINTMENT_CUSTOM_SERVICES_QUERY_FIELDS = `
  id
  name
  cost
`

export const LIST_APPOINTMENT_QUERY_FIELDS = `
  id
  status
  startsAt
  endsAt
  tax
  cost
  duration
  discountAmount
  credits
  serviceFee
  loyaltyDiscount
  tip
  totalAmount
  technicianId
  cardFingerprintId
  appointmentServices {
    ${APPOINTMENT_SERVICES_QUERY_FIELDS}
  }
  customServices {
    ${APPOINTMENT_CUSTOM_SERVICES_QUERY_FIELDS}
  }
  salon {
    ${LIST_SALON_QUERY_FIELDS}
  }
  review {
    id
  }
`