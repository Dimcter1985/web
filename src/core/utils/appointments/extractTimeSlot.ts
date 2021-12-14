import moment from 'moment'
import durationBetweenDates from 'core/utils/dateTime/durationBetweenDates'

export default function extractTimeSlot(date: Date | string): number {
  return durationBetweenDates(moment(date), moment(date).startOf('day')).asMinutes()
}
