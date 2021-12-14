export type ICheckoutAppointment = Pick<IAppointment,
  | 'id'
  | 'startsAt'
  | 'appointmentServices'
  | 'cost'
  | 'discount'
  | 'credits'
  | 'tip'
  | 'tax'
  | 'totalAmount'
  | 'serviceFee'
  > & {
    salon: ISalon,
    cardFingerprintId: number,
}

const LIST_SERVICES_QUERY_FIELDS = `
  id
  cost
  name
  quantity
`

const LIST_SALON_QUERY_FIELDS = `
  id
  name
  address
  addressLine2
  timezone
`

const LIST_DISCOUNT_QUERY_FIELDS = `
  amount
`

export const LIST_APPOINTMENT_QUERY_FIELDS = `
  id
  startsAt
  cost
  discount {
    ${LIST_DISCOUNT_QUERY_FIELDS}
  }
  credits
  tip
  tax
  serviceFee
  totalAmount
  cardFingerprintId
  appointmentServices {
    ${LIST_SERVICES_QUERY_FIELDS}
  }
  salon {
    ${LIST_SALON_QUERY_FIELDS}
  }
`

export const RETURN_LIST_APPOINTMENT_QUERY_FIELD = 'id'
