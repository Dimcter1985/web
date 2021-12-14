import React from 'react'
import withUserGuard from 'hocs/withUserGuard'
import AppointmentsWrapper from 'components/Appointments/AppointmentsWrapper'
import AppointmentsList from 'components/Appointments/AppointmentsList'
import { AppointmentSortBy, SortDirections } from 'core/consts/sorting'

const PastAppointments: React.FC = () => (
  <AppointmentsWrapper currentTime='past'>
    <AppointmentsList
      emptyText='You have no past appointments.'
      batch='past'
      infinity
      sort={{
        sortBy: AppointmentSortBy.STARTS_AT,
        order: SortDirections.DESC,
      }}
    />
  </AppointmentsWrapper>
)

export default withUserGuard(PastAppointments)
