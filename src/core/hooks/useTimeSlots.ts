import { useCallback, useEffect, useMemo, useState } from 'react'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import moment, { Moment } from 'moment-timezone'

import fetchTechnicians from 'core/api/technicians/fetchTechnicians'
import DateTimeRange from 'core/utils/dateTime/dateTimeRange'
import useAppointments from './useAppointments'

export interface IUseTimeSlots {
  availableTimeSlots: IAvailableTimeSlot[]
  availableSlots: number[]
  isSelectedDateToday: boolean
  bookedTimes: DateTimeRange[]
  fetchSlots: () => void
  slotsLoading: boolean
  slotsLoaded: boolean
  getTechnicianId: (slot: number) => number
}

interface IProps {
  salonId: number
  appointment?: IListAppointment | null
  timezone?: string
  date?: Date
  services: IBookFormService[]
}

type ISalonTechnician = Pick<ITechnician, 'id' | 'timeSlots'>

const COMPARE_DATE_FORMAT = 'Y-MM-DD'

const useTimeSlots = ({
  salonId,
  appointment,
  date: selectedDate,
  services,
  timezone = moment.tz.guess(),
}: IProps): IUseTimeSlots => {
  const [salonTechnicians, setSalonTechnicians] = useState<ISalonTechnician[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsLoaded, setSlotsLoaded] = useState(false)

  const { getAppointmentsForDate } = useAppointments()

  const bookedTimes = useMemo(() => (
    selectedDate
      ? getAppointmentsForDate(selectedDate)
          .filter(({ id }) => id !== (appointment || {}).id)
          .map(({ startsAt, endsAt }) => (
            DateTimeRange.build(startsAt, endsAt)
          ))
      : []
  ), [appointment, selectedDate, getAppointmentsForDate])

  const getDateInTimezone = useCallback((newDate?: Date) => (
    moment(newDate).tz(timezone)
  ), [timezone])

  const getStartOfDay = useCallback((newDate: Date) => (
    moment(newDate).startOf('day')
  ), [])

  const getMinutesFromDate = useCallback((newDate: Moment) => (
    newDate.hours() * 60 + newDate.minutes()
  ), [])

  const isSelectedDateToday = useMemo(() => {
    const futureDate = getDateInTimezone(selectedDate).format(COMPARE_DATE_FORMAT)
    const currentDate = getDateInTimezone().format(COMPARE_DATE_FORMAT)
    return futureDate === currentDate
  }, [getDateInTimezone, selectedDate, timezone])

  const timeSlots = useMemo(() => 
    salonTechnicians.length
      ? uniqBy(flatten(
        salonTechnicians
          .map(tech => (
            tech.timeSlots.map(slot => ({
              slot: getMinutesFromDate(moment.parseZone(slot)),
              technicianId: tech.id,
            }))
          )),
      ), 'slot')
      : []
  , [salonId, salonTechnicians])

  const availableTimeSlots = useMemo(() => {
    let slots: IAvailableTimeSlot[] = timeSlots
    const now = getDateInTimezone()

    if (isSelectedDateToday) {
      const currentTimeWithOffset = getMinutesFromDate(now)
      slots = slots.filter(({ slot }) => slot > currentTimeWithOffset)
    }

    if (!bookedTimes.length || !selectedDate) return slots

    return slots.filter(({ slot }) => {
      const slotDateTime = getStartOfDay(selectedDate).add(slot, 'minutes')
      return !bookedTimes.some(bt => bt.includes(slotDateTime))
    })
  }, [timeSlots, getDateInTimezone, isSelectedDateToday, getMinutesFromDate, bookedTimes, selectedDate])

  const availableSlots = useMemo(() => availableTimeSlots.map((slot) => slot.slot), [availableTimeSlots])

  const fetchSlots = useCallback(async () => {
    if (!salonId || !selectedDate || !services.length) return
    const searchDate = getStartOfDay(selectedDate).toISOString(true)
    try {
      setSlotsLoading(true)
      setSlotsLoaded(false)
      setSalonTechnicians([])
      const { data } = await fetchTechnicians<ISalonTechnician>({
        queryFields: 'id timeSlots',
        filters: {
          appointmentId: (appointment || {}).id,
          serviceIds: services.map(({ service: { id } }) => id),
          searchDate,
          salonId,
        },
      })
      setSlotsLoaded(true)
      setSalonTechnicians(data)
    } catch (error) {
      return null
    } finally {
      setSlotsLoading(false)
    }
  }, [salonId, services, selectedDate, getStartOfDay, appointment, getMinutesFromDate])

  const getTechnicianId = useCallback((slot: number) => (
    availableTimeSlots.find((timeSlot) => timeSlot.slot === slot)!.technicianId
  ), [availableTimeSlots])

  useEffect(() => {
    fetchSlots()
  }, [])

  return {
    availableTimeSlots,
    availableSlots,
    isSelectedDateToday,
    bookedTimes,
    fetchSlots,
    slotsLoading,
    slotsLoaded,
    getTechnicianId,
  }
}

export default useTimeSlots