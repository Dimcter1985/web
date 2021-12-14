import { useCallback, useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { CANCELLATION_FEE_TYPE_CASH } from 'core/consts'

import durationBetweenDates from 'core/utils/dateTime/durationBetweenDates'
import cancelAppointment from 'core/api/appointments/cancelAppointment'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import money from 'core/utils/money'

type ICallbackCancellation = (appointment: IListAppointment) => void

interface IUseCancelAppointment {
  loading: boolean
  cancelationMessage?: string
  cancel: (callback?: ICallbackCancellation) => Promise<void>
  penaltyFee: number
}

interface IProps {
  appointment: IListAppointment
  animateNextFrameWith?: () => void
  onError: (message: string) => void
}

type IAppointmentSalonSettings = Pick<ISalonSettings,
  | 'cancelationFee'
  | 'cancelationFeePeriod'
  | 'cancelationFeeType'
>

const useCancelAppointment = ({ appointment, animateNextFrameWith, onError }: IProps): IUseCancelAppointment => {
  const penaltyFee = useRef(0)
  const [loading, setLoading] = useState(false)
  const [cancelationMessage, setCancelationMessage] = useState<string>()
  const [appoitmentSalonSettings, setAppoitmentSalonSettings] = useState<IAppointmentSalonSettings>()

  const salonSettings = useCallback(async () => {
    if (appoitmentSalonSettings) return appoitmentSalonSettings
    const settings = await fetchSalonSettings<IAppointmentSalonSettings>({
      salonId: appointment.salon.id,
    })
    setAppoitmentSalonSettings(settings)
    return settings
  }, [appointment, appoitmentSalonSettings])

  const getCancelationMessage = useCallback(() => {
    if (penaltyFee.current > 0) {
      return `You are outside of the cancellation period and will be charged ${money(penaltyFee.current)}.\nDo you still want to cancel your appointment?`
    }
    return "We get it, things happen. Don't worry your card won't be charged and we hope to see you soon!"
  }, [])

  const calculatePenaltyFee = useCallback((settings: IAppointmentSalonSettings) => {
    const { cancelationFeeType, cancelationFee, cancelationFeePeriod } = settings
    if (durationBetweenDates(moment(appointment.startsAt), moment()).asMinutes() > cancelationFeePeriod) {
      return 0
    }
    return cancelationFeeType === CANCELLATION_FEE_TYPE_CASH
      ? cancelationFee
      : appointment.cost * cancelationFee / 100
  }, [appointment])

  const cancel = useCallback(async (callback?: ICallbackCancellation) => {
    if (loading) return
    try {
      setLoading(true)
      await cancelAppointment({ id: appointment.id })
      setLoading(false)
      if (callback) callback(appointment)
    } catch ({ message }) {
      setLoading(false)
      onError(message)
    }
  }, [appointment, loading, onError])

  const requestCancelationMessage = useCallback(async () => {
    try {
      setLoading(true)
      penaltyFee.current = calculatePenaltyFee(await salonSettings())
      if (animateNextFrameWith) animateNextFrameWith()
      setCancelationMessage(getCancelationMessage())
    } catch ({ message }) {
      onError(message)
    } finally {
      setLoading(false)
    }
  }, [animateNextFrameWith, calculatePenaltyFee, salonSettings, getCancelationMessage, onError])

  useEffect(() => {
    requestCancelationMessage()
  }, [])

  return {
    cancelationMessage,
    cancel,
    loading,
    penaltyFee: penaltyFee.current,
  }
}

export default useCancelAppointment