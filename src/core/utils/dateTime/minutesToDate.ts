import moment, { Moment } from 'moment'

export default function minutesToDate(minutes: number, date?: Date | string): Moment {
  return moment(date).startOf('day').add(minutes, 'm')
}
