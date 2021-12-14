import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import compact from 'lodash/compact'

import { AppointmentSortBy, SortDirections } from 'core/consts/sorting'
import fetchAppointments from 'core/api/appointments/fetchAppointments'
import isUpcoming from 'core/utils/appointments/isUpcoming'
import inProgress from 'core/utils/appointments/inProgress'
import timeDiffUnix from 'core/utils/dateTime/timeDiffUnix'
import { Statuses } from 'core/consts/appointments'
import timerTask from 'core/utils/timerTask'
import { HIDDEN_APPT_STORAGE_KEY, RECENT_APPOINTMENT_QUERY_FIELDS } from './consts'
import useAppointments from '../useAppointments'
import useStorage from '../useStorage'

export interface IUseRecentAppointment {
  appointment: IRecentAppointment | undefined
  inProgress: boolean
  isPending: boolean
  hide: () => Promise<undefined>
  refresh: () => void
}

interface IProps {
  animateNextFrameWith?: () => void
}

const useRecentAppointment = ({ animateNextFrameWith }: IProps = {}): IUseRecentAppointment => {
  const [pastAppointment, setPastAppoitment] = useState<IRecentAppointment | null>(null)
  const [hiddenApptIds, setHiddenApptIds] = useState<number[]>([])
  const timeout = useRef<NodeJS.Timeout | number>()

  const { upcomingAppointment, inProgressAppointment, refresh } = useAppointments()
  const { storage } = useStorage()

  const fetchHiddenApptId = useCallback(async () => {
    try {
      const apptIds = await storage.getItem<number[]>(HIDDEN_APPT_STORAGE_KEY)
      setHiddenApptIds(apptIds || [])
    } catch (error) {
      return undefined
    }
  }, [storage])

  const fetchPastAppointment = useCallback(async () => {
    try {
      const { data } = await fetchAppointments<IRecentAppointment>({
        queryFields: RECENT_APPOINTMENT_QUERY_FIELDS,
        filters: { statuses: [Statuses.DONE, Statuses.PENDING] },
        sort: {
          sortBy: AppointmentSortBy.STARTS_AT,
          order: SortDirections.ASC,
        },
      })
      if (animateNextFrameWith) animateNextFrameWith()
      setPastAppoitment(data[0])
    } catch (error) {
      return undefined
    }
  }, [animateNextFrameWith])

  useEffect(() => {
    fetchHiddenApptId()
    return timerTask(fetchPastAppointment)
  }, [])

  const appointment = useMemo(() => {
    if (!inProgressAppointment) {
      return compact([upcomingAppointment, pastAppointment]).find(({ id }) => !(hiddenApptIds.includes(id)))
    }
    return inProgressAppointment
  }, [hiddenApptIds, inProgressAppointment, pastAppointment, upcomingAppointment])

  const hide = useCallback(async () => {
    if (!appointment) return
    try {
      const apptIds = [...hiddenApptIds, appointment.id]
      await storage.setItem(HIDDEN_APPT_STORAGE_KEY, apptIds)
      if (animateNextFrameWith) animateNextFrameWith()
      setHiddenApptIds(apptIds)
    } catch (error) {
      return undefined
    }
  }, [storage, hiddenApptIds, appointment, animateNextFrameWith])

  const refreshAllAppointments = useCallback(() => {
    refresh()
    fetchPastAppointment()
  }, [refresh, fetchPastAppointment])

  const startTimeout = useCallback((callback: () => void, time: number) => {
    timeout.current = setTimeout(callback, time)
  }, [timeout.current])

  const resetTimeout = useCallback(() => {
    if (timeout.current) clearInterval(timeout.current as NodeJS.Timeout)
  }, [timeout.current])

  useEffect(() => {
    if (appointment && !timeout.current) {
      if (isUpcoming(appointment)) {
        const time = timeDiffUnix(appointment.startsAt) * 1000
        startTimeout(refreshAllAppointments, time)
      }
      if (inProgress(appointment)) {
        const time = timeDiffUnix(appointment.endsAt) * 1000
        startTimeout(refreshAllAppointments, time)
      }
    }
    if (!appointment) {
      resetTimeout()
    }
    return (): void => { resetTimeout() }
  }, [appointment])

  return {
    appointment,
    inProgress: !!inProgressAppointment,
    isPending: appointment?.status === Statuses.PAYMENT_FAILED,
    hide,
    refresh: refreshAllAppointments,
  }
}

export default useRecentAppointment