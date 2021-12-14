import moment from 'moment'

export default function formatDate(date: Date, format: string): string {
  return moment(date).format(format)
}
