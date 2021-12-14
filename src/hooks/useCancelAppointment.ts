import { useContext } from 'react'
import { Context, IContext } from 'contexts/cancelAppointment'

const useCancelAppointment = (): IContext => {
  return useContext(Context)
}

export default useCancelAppointment
