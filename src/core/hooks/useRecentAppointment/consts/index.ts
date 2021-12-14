import { LIST_SALON_QUERY_FIELDS } from 'core/api/consts/salon'

export const RECENT_APPOINTMENT_QUERY_FIELDS = `
  id
  status
  startsAt
  endsAt
  salon {
    ${LIST_SALON_QUERY_FIELDS}
  }
  review {
    id
  }
`

export const HIDDEN_APPT_STORAGE_KEY = 'hidden-appt-ids'