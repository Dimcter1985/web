import { useMemo } from 'react'

import AppointmentCalculator, { IServicePack } from 'core/utils/appointments/calculator'
import useGlobalSettings from 'core/hooks/useGlobalSettings'

interface IParams {
  services: IServicePack[]
  credits?: number
  taxes: number,
  tipIndex: number
  discount?: number
  loyaltyProgram?: IAppliedLoyaltyProgram
  loyaltyDiscount?: number
}

const useCheckoutReceipt = (params: IParams): IAppointmentCostDetails => {
  const { settings } = useGlobalSettings()

  const receipt = useMemo(() => (
    AppointmentCalculator.calculate({
      ...params,
      serviceFee: settings.serviceFee,
    })
  ), [params, settings])

  return receipt
}

export default useCheckoutReceipt