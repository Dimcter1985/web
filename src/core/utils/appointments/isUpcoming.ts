import { Statuses } from 'core/consts/appointments'

type IParams = Pick<IAppointment, 'status'>

export default function isUpcoming({ status }: IParams): boolean {
  return status === Statuses.BOOKED
}