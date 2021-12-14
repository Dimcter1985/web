import React, { useState, useCallback, createContext } from 'react'
import noop from 'lodash/noop'
import moment from 'moment'

import cancelAppointment from 'core/api/appointments/cancelAppointment'
import fetchSalonSettings from 'core/api/salons/fetchSalonSettings'
import durationBetweenDates from 'core/utils/dateTime/durationBetweenDates'
import { CANCELLATION_FEE_TYPE_CASH } from 'core/consts'
import CancelDialog from './components/CancelDialog'
import ConfirmDialog from './components/ConfirmDialog'

type IAppointmentSalonSettings = Pick<ISalonSettings,
  | 'cancelationFee'
  | 'cancelationFeePeriod'
  | 'cancelationFeeType'
>

interface IProps {
  removeFromList: (appointment: IListAppointment) => void;
}

export interface IContext {
  showCancelDialog: (appointment: IListAppointment) => void;
}

const Context = createContext<IContext>({
  showCancelDialog: noop,
})

const calculatePenaltyFee = (app: IListAppointment, settings: IAppointmentSalonSettings) => {
  const { cancelationFeeType, cancelationFee, cancelationFeePeriod } = settings
  if (durationBetweenDates(moment(app.startsAt), moment()).asMinutes() > cancelationFeePeriod) {
    return 0
  }
  return cancelationFeeType === CANCELLATION_FEE_TYPE_CASH
    ? cancelationFee
    : app.cost * cancelationFee / 100
}

const Provider: React.FC<IProps> = ({ removeFromList, children }) => {
  const [penaltyFee, setPenaltyFee] = useState(0)
  const [visibleCancelDialog, setVisibleCancelDialog] = useState(false)
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false)
  const [appointment, setAppointment] = useState<IListAppointment>()

  const showCancelDialog = useCallback(async (app: IListAppointment) => {
    setAppointment(app)
    const settings = await fetchSalonSettings<IAppointmentSalonSettings>({
      salonId: app.salon.id,
    })
    setPenaltyFee(calculatePenaltyFee(app, settings))
    setVisibleCancelDialog(true)
  }, [setAppointment, setPenaltyFee, calculatePenaltyFee, setVisibleCancelDialog])

  const hideCancelDialog = useCallback(() => setVisibleCancelDialog(false), [setVisibleCancelDialog])
  
  const hideConfirmDialog = useCallback(() => {
    setVisibleConfirmDialog(false)
    removeFromList(appointment!)
  }, [setVisibleConfirmDialog, appointment])

  const onConfirmCancel = useCallback(() => {
    cancelAppointment({ id: appointment!.id })
      .then(() => setVisibleConfirmDialog(true))
      .catch(({ message }) => alert(message))
      .finally(() => setVisibleCancelDialog(false))
  }, [appointment, setVisibleConfirmDialog, setVisibleCancelDialog])

  const value: IContext = {
    showCancelDialog,
  }

  return (
    <Context.Provider value={value}>
      { children }
      <CancelDialog
        open={visibleCancelDialog}
        onClose={hideCancelDialog}
        onConfirm={onConfirmCancel}
        penaltyFee={penaltyFee}
      />
      <ConfirmDialog
        open={visibleConfirmDialog}
        onClose={hideConfirmDialog}
        penaltyFee={penaltyFee}
      />
    </Context.Provider>
  )
}

export { Context }

export default Provider
