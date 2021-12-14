import moment from 'moment'

export default function isToday(date?: Date | string): boolean {
  return moment()
    .startOf('day')
    .isSame(moment(date).startOf('day'))
}
