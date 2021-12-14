import { useCallback, useContext, useMemo } from 'react'
import moment from 'moment'

import Appointments from 'core/contexts/Appointments'
import inProgress from 'core/utils/appointments/inProgress'

export interface IUseAppointments extends IAppointmentsContext {
  getAppointmentsForDate: (date: Date | string) => IListAppointment[]
  upcomingAppointment: IListAppointment | undefined
  inProgressAppointment: IListAppointment | undefined
}

const useAppointments = (): IUseAppointments => {
  const appointments = useContext(Appointments)

  const getAppointmentsForDate = useCallback((date: Date | string) => {
    const dayStart = moment(date).startOf('day')
    const dayEnd = moment(date).endOf('day')
    return appointments.data.filter(({ startsAt }) => (
      moment(startsAt).isBetween(dayEnd, dayStart, 'days', '[]')),
    )
  }, [appointments])

  const upcomingAppointment = useMemo(() => (
    getAppointmentsForDate(new Date())[0] || appointments.data[0]
  ), [appointments])

  const inProgressAppointment = useMemo(() => (
    appointments.data.find(appt => inProgress(appt))
  ), [appointments])

  return {
    ...appointments,
    getAppointmentsForDate,
    upcomingAppointment,
    inProgressAppointment,
  }
}

export default useAppointments