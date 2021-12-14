import { Statuses } from 'core/consts/appointments'

type IParams = Pick<IAppointment, 'status'>

const IN_PROGRESS_STATUSES = [Statuses.IN_PROGRESS, Statuses.PAYMENT_FAILED]

export default function inProgress({ status }: IParams): boolean {
  return IN_PROGRESS_STATUSES.includes(status)
}