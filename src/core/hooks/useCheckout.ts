import { useCallback, useState } from 'react'
import isNumber from 'lodash/isNumber'

import createAppointment, { ICreateAppointmentParams } from 'core/api/appointments/createAppointment'
import modifyAppointment, { IUpdateAppointmentParams } from 'core/api/appointments/updateAppointment'

export interface IBookAppointmentParams extends ICreateAppointmentParams {
  tipIndex?: number
}

export interface IUseCheckout {
  bookAppointment: (values: IBookAppointmentParams) => Promise<IListAppointment>
  updateAppointment: (values: IUpdateAppointmentParams) => Promise<IListAppointment>
  submitting: boolean
}

interface IParams {
  salon: Pick<ISalon, 'tipping'>
}

const useCheckout = ({ salon }: IParams): IUseCheckout => {
  const [submitting, setSubmitting] = useState(false)

  const checkTipping = useCallback((tipIndex?: number) => {
    if (salon.tipping && !isNumber(tipIndex)) {
      throw new Error('Please, select tip')
    }
  }, [salon])

  const bookAppointment = useCallback(async ({ tipIndex, ...values }: IBookAppointmentParams) => {
    try {
      setSubmitting(true)
      checkTipping(tipIndex)
      return await createAppointment(values)
    } catch (e) {
      throw new Error(e.message)
    } finally {
      setSubmitting(false)
    }
  }, [checkTipping, salon])

  const updateAppointment = useCallback(async (values: IUpdateAppointmentParams) => {
    try {
      setSubmitting(true)
      return await modifyAppointment(values)
    } catch (e) {
      throw new Error(e.message)
    } finally {
      setSubmitting(false)
    }
  }, [salon])

  return {
    bookAppointment,
    updateAppointment,
    submitting,
  }
}

export default useCheckout