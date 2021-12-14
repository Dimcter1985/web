import moment, { Moment } from 'moment-timezone'

const minutesFromStartOfDay = (value: Moment | Date | string): number => {
  const momentValue = moment(value)
  return momentValue.hours() * 60 + momentValue.minutes()
}

export default minutesFromStartOfDay
