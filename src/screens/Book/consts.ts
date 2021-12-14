import { DEFAULT_TIMEZONE } from 'consts'

export const initSalon = {
  name: '',
  address: '',
  addressLine2: '',
  timezone: DEFAULT_TIMEZONE,
}

export const emptyInitValues = {
  specialRequests: '',
  cardId: null,
  usingCredit: false,
  tipIndex: null,
  discount: null,
}

export const EXTEND_APPOINTMENT_QUERY = `
  specialRequests
  cardFingerprintId
  credits
  discount {
    code
    id
  }
`
