import moment from 'moment'

type IParams = Pick<IAppointment, 'startsAt'>

export default function isStart({ startsAt }: IParams): boolean {
  return moment().isAfter(moment(startsAt))
}