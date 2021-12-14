import moment, { Moment } from 'moment'

export default function stringifyDateTime(date: string | Date | Moment | null): string | undefined {
  if (!date) return undefined
  return moment(date).toISOString()
}