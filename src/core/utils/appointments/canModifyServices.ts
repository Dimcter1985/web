import { Statuses } from 'core/consts/appointments'

type IParams = Pick<IAppointment, 'status'>

const ALLOW_MODIFY_STATUSES = [Statuses.BOOKED, Statuses.IN_PROGRESS]

export default function canModifyServices({ status }: IParams): boolean {
  return ALLOW_MODIFY_STATUSES.includes(status)
}