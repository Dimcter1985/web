import { Statuses } from "core/consts/appointments"

type IParams = Pick<IAppointment, 'status'>

const hasPaymentFailed = (appointment: IParams): boolean => (
  appointment.status === Statuses.PAYMENT_FAILED
)

export default hasPaymentFailed
