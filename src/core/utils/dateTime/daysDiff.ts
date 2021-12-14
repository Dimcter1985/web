import moment from 'moment'
import durationBetweenDates from './durationBetweenDates'

export default function daysDiff(date?: Date | string): number {
  const todayStart = moment().startOf('day')
  const dateStart = moment(date).startOf('day')
  return durationBetweenDates(dateStart, todayStart).asDays()
}