import moment from 'moment'

type IParams = Pick<IAppointment, 'endsAt'>

export default function isPast({ endsAt }: IParams): boolean {
  return moment().isSameOrAfter(moment(endsAt))
}