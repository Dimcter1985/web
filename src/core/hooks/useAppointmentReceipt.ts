import { useMemo } from 'react'

const useAppointmentReceipt = (appointment: IListAppointment): IAppointmentReceipt => {
  const receipt = useMemo(() => ({
    subtotal: appointment.cost,
    credits: appointment.credits,
    discount: appointment.discountAmount,
    serviceFee: appointment.serviceFee,
    loyalty: appointment.loyaltyDiscount,
    tip: appointment.tip,
    taxes: appointment.tax,
    total: appointment.totalAmount,
  }), [appointment])

  return receipt
}

export default useAppointmentReceipt