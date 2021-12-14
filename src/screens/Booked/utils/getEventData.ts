import moment from 'moment'

const getEventData = (appointment: IListAppointment) => {
  const { startsAt, endsAt, appointmentServices, salon } = appointment
  const startTime = moment(startsAt)
  const endTime = moment(endsAt)
  const startDatetime = startTime.utc().format('YYYYMMDDTHHmmssZ')
  const endDatetime = endTime.utc().format('YYYYMMDDTHHmmssZ')
  const duration = endTime.diff(startTime, 'hours')

  return ({
    startDatetime,
    endDatetime,
    duration,
    title: appointmentServices.map((service) => service.name).join(', '),
    location: `${salon.address}, ${salon.city}`,
    timezone: appointment.salon.timezone,
    description: '',
  })
}

export default getEventData
