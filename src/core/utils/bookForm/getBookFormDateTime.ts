import minutesToDate from 'core/utils/dateTime/minutesToDate'
import isTomorrow from 'core/utils/dateTime/isTomorrow'
import isToday from 'core/utils/dateTime/isToday'
import { DAY_FORMAT } from 'core/consts/dateTime'

interface IBookDateTimeProps {
  date: Date | string
  slot: number
}

const TIME_FORMAT = 'h:mm A'

export default function getBookFormDateTime({ date, slot }: IBookDateTimeProps): string {
  if (isToday(date)) return `Today ${minutesToDate(slot).format(TIME_FORMAT)}`
  if (isTomorrow(date)) return `Tomorrow ${minutesToDate(slot).format(TIME_FORMAT)}`
  return minutesToDate(slot, date).format(`${DAY_FORMAT} ${TIME_FORMAT}`)
}