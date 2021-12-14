import moment from 'moment'

export default function isSameDay(
  firstDate: IDate,
  secondDate: IDate = moment(),
): boolean {
  return moment(firstDate).isSame(moment(secondDate), 'day')
}