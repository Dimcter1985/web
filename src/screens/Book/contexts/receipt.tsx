import { createContext, useMemo } from 'react'
import { useFormState } from 'react-final-form'
import useCurrectSalon from 'hooks/useCurrentSalon'
import useCart from 'hooks/useCart'
import AppointmentCalculator from 'core/utils/appointments/calculator'
import { IValues } from '../types'

interface IProps {
  balance: number
}

export interface IExtendedAppointmentCostDetails extends IAppointmentCostDetails {
  balance: number
}

const ReceiptContext = createContext<IExtendedAppointmentCostDetails>({} as IExtendedAppointmentCostDetails)

const ReceiptProvider: React.FC<IProps> = ({ balance, children }) => {
  const salon = useCurrectSalon()
  const { items } = useCart()
  const { values } = useFormState<IValues>()

  const receipt: IExtendedAppointmentCostDetails = useMemo(() => {
    return ({
      balance,
      ...AppointmentCalculator.calculate({
        services: items,
        taxes: salon.tax,
        tipIndex: values.tipIndex !== null ? values.tipIndex : undefined,
        credits: values.usingCredit ? balance : undefined,
        discount: values.discount?.amount,
        serviceFee: values.serviceFee,
      }),
    })
  }, [items, values.tipIndex, salon.tax, values.discount?.amount, values.usingCredit, balance, values.serviceFee])

  return (
    <ReceiptContext.Provider value={receipt}>
      { children }
    </ReceiptContext.Provider>
  )
}

export { ReceiptProvider }

export default ReceiptContext
