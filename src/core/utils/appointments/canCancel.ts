import { Statuses } from 'core/consts/appointments'

type IParams = Pick<IAppointment, 'status'>

export default function canCancel({ status }: IParams): boolean {
  return status === Statuses.BOOKED
}