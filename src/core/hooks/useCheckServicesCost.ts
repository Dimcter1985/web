import { useCallback, useMemo } from 'react'
import sumBy from 'lodash/sumBy'

interface IUseCheckServicesCost {
  checkCost: (values: IBookFormValues) => void
}

interface IProps {
  appointment: IListAppointment | null
  onSuccess: (values: IBookFormValues) => void
  onException: (message: string, values: IBookFormValues) => void
}

export const DECREASE_COST_MESSAGE = `Whoa, your total price went down!\nYou will receive a credit in your Snailz Wallet to use on future bookings after your appointment is over.\nThank you!`

const useCheckServicesCost = ({ appointment, onSuccess, onException }: IProps): IUseCheckServicesCost => {
  const apptServicesCost = useMemo(() => {
    if (!appointment) return 0
    const { appointmentServices, customServices } = appointment
    return sumBy(appointmentServices, 'cost') + sumBy(customServices, 'cost')
  }, [appointment])

  const calcNewServicesCost = useCallback((values: IBookFormValues) => {
    const { services, customServices } = values
    return sumBy(services, ({ service }) => (service as ISalonService).cost) +
           sumBy(customServices, 'cost')
  }, [])

  const checkCost = useCallback((values: IBookFormValues) => {
    if (!appointment || apptServicesCost <= calcNewServicesCost(values)) {
      return onSuccess(values)
    }
    onException(DECREASE_COST_MESSAGE, values)
  }, [appointment, apptServicesCost, calcNewServicesCost, onException, onSuccess])

  return {
    checkCost,
  }
}

export default useCheckServicesCost