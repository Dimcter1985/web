import React from 'react'
import withUserGuard from 'hocs/withUserGuard'
import { AppointmentSortBy, SortDirections } from 'core/consts/sorting'
import AppointmentsWrapper from 'components/Appointments/AppointmentsWrapper'
import AppointmentsList from 'components/Appointments/AppointmentsList'

const UpcomingAppointments: React.FC = () => (
  <AppointmentsWrapper currentTime='upcoming'>
    <AppointmentsList
      emptyText='You have no upcoming appointments.'
      sort={{
        sortBy: AppointmentSortBy.STARTS_AT,
        order: SortDirections.ASC,
      }}
      batch='upcoming'
      infinity
    />
  </AppointmentsWrapper>
)

export default withUserGuard(UpcomingAppointments)
