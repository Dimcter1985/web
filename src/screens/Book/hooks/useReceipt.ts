import { useContext } from 'react'

import Context, { IExtendedAppointmentCostDetails } from '../contexts/receipt'


const useReceipt = (): IExtendedAppointmentCostDetails => {
  return useContext(Context)
}

export default useReceipt
