import { Statuses } from 'core/consts/appointments'
import isStart from './isStarted'

type IParams = Pick<IAppointment, 'status' | 'startsAt'>

export default function canModify(appointment: IParams): boolean {
  return !(isStart(appointment) || appointment.status !== Statuses.BOOKED)
}