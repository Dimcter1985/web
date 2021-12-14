import { useCallback } from 'react'

import fetchAppointments from 'core/api/appointments/fetchAppointments'
import { Statuses } from 'core/consts/appointments'
import useList, { IUseList } from './useList'

interface IUseAppointmentsList extends IUseList<IListAppointment> {
  removeFromList: (appointment: IListAppointment, onBeforeRemove?: () => void) => void
}

interface IProps {
  statuses?: Statuses[]
  sort?: {
    order: ISortDirection
    sortBy: IAppointmentSortBy
  }
  batch?: AppointmentsBatch
  infinity?: boolean
}

const useAppointmentsList = ({ statuses = [], sort, batch, infinity }: IProps): IUseAppointmentsList => {
  const list = useList<IListAppointment>(fetchAppointments, {
    filters: { statuses, batch },
    sort,
    infinity,
  })

  const { data: appointments, set: setAppointments } = list

  const removeFromList = useCallback((appointment: IListAppointment, onBeforeRemove?: () => void) => {
    if (onBeforeRemove) onBeforeRemove()
    setAppointments(appointments.filter(appt => appt.id !== appointment.id))
  }, [appointments, setAppointments])

  return {
    ...list,
    removeFromList,
  }
}

export default useAppointmentsList