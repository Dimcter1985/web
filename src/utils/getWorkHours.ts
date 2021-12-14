import { TIME_FORMAT } from 'core/consts/dateTime'
import minutesToDate from 'core/utils/dateTime/minutesToDate'

const getWorkHours = (day: IDayWorkHours): string => {
  if (day.work === 'no') { return 'Closed' }
  return `${minutesToDate(day.start).format(TIME_FORMAT)} - ${minutesToDate(day.end).format(TIME_FORMAT)}`
}

export default getWorkHours
