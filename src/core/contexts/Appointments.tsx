import React, { createContext, useEffect } from 'react'

import fetchAppointments from 'core/api/appointments/fetchAppointments'
import timerTask from 'core/utils/timerTask'
import useList from 'core/hooks/useList'
import useApp from 'core/hooks/useApp'

const Appointments = createContext({} as IAppointmentsContext)

const AppointmentsProvider: React.FC = ({ children }) => {
  const { isLogged } = useApp()

  const appointments = useList<IListAppointment>(fetchAppointments, {
    ready: false,
    filters: {
      batch: 'upcoming',
    },
  })

  useEffect(() => {
    if (isLogged) return timerTask(appointments.refresh)
  }, [isLogged])

  return (
    <Appointments.Provider value={appointments}>
      {children}
    </Appointments.Provider>
  )
}

export { AppointmentsProvider }

export default Appointments