import moment, { Moment, Duration } from 'moment'

export default function durationBetweenDates(firstDate: Moment, secondDate: Moment): Duration {
  return moment.duration(firstDate.diff(secondDate))
}