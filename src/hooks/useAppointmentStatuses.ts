import hasPaymentFailed from 'core/utils/appointments/hasPaymentFailed'
import inProgress from 'core/utils/appointments/inProgress'
import canBeModify from 'core/utils/appointments/canModify'
import isPast from 'core/utils/appointments/isPast'

interface IProps {
  appointment: IListAppointment
}

interface IUseAppointmentStatuses {
  withPaymentFaild: boolean
  canModifyServices: boolean
  canModify: boolean
  canRebook: boolean
}

const useAppointmentStatuses = ({ appointment }: IProps): IUseAppointmentStatuses => {
  const withPaymentFaild = hasPaymentFailed(appointment)
  const canModifyServices = !withPaymentFaild && inProgress(appointment)
  const canModify = !withPaymentFaild && canBeModify(appointment)
  const canRebook = !withPaymentFaild && isPast(appointment) && !inProgress(appointment)
  
  return ({
    withPaymentFaild,
    canModifyServices,
    canModify,
    canRebook,
  })
}

export default useAppointmentStatuses
