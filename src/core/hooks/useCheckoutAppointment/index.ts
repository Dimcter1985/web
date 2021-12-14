import { useEffect, useMemo } from 'react'

import { CASH_TIPS, MIN_TIPS_SUBTOTAL, PERCENT_TIPS, PROMO, REFERRAL } from 'core/consts'
import fetchAppointment from 'core/api/appointments/fetchAppointment'
import { FORM_FIELDS } from 'core/forms/checkout/consts'
import { CHECKOUT_APPOINTMENT_QUERY_FIELDS } from './consts'
import useApi from '../useApi'

interface IUseCheckoutAppointment {
  initialCheckoutValues: Record<string, unknown>
  loading: boolean
}

interface ICheckoutAppointment {
  cost: number
  credits: number
  cardFingerprintId?: number
  loyaltyCardId?: number
  loyaltyDiscount?: number
  discount?: ICalculatedDiscount
  referralCode?: string
  referralDiscount: number
  specialRequests?: string
  tip: number
}

const useCheckoutAppointment = (appointment?: IListAppointment): IUseCheckoutAppointment => {
  const { data, fetch, loading } = useApi<ICheckoutAppointment>(fetchAppointment)

  const appliedPromo = useMemo(() => {
    if (!data) return
    if (data.discount) {
      return { ...data.discount, type: PROMO }
    }
    if (data.referralCode) {
      return {
        type: REFERRAL,
        code: data.referralCode,
        amount: data.referralDiscount,
      }
    }
  }, [data])

  const tipIndex = useMemo(() => {
    if (!data) return
    const { tip, cost } = data
    if (tip === 0) return 3
    if (cost > MIN_TIPS_SUBTOTAL) {
      return PERCENT_TIPS.findIndex(percentTip => tip === (cost * percentTip) / 100)
    }
    return CASH_TIPS.findIndex(cashTip => cashTip === tip)
  }, [data])

  const initialCheckoutValues = useMemo(() => {
    if (!data) return {}
    return {
      [FORM_FIELDS.CREDIT_CARD_ID]: data.cardFingerprintId,
      [FORM_FIELDS.CREDITS]: data.credits,
      [FORM_FIELDS.LOYALTY_CARD_ID]: data.loyaltyCardId,
      [FORM_FIELDS.LOYALTY_DISCOUNT]: data.loyaltyDiscount,
      [FORM_FIELDS.PROMO]: appliedPromo,
      [FORM_FIELDS.PROMO_CODE]: (appliedPromo || {}).code,
      [FORM_FIELDS.TIP_INDEX]: tipIndex,
      [FORM_FIELDS.SPECIAL_REQUESTS]: data.specialRequests,
    }
  }, [data])

  useEffect(() => {
    if (appointment) {
      fetch({
        queryFields: CHECKOUT_APPOINTMENT_QUERY_FIELDS,
        id: appointment.id,
      })
    }
  }, [])

  return {
    initialCheckoutValues,
    loading,
  }
}

export default useCheckoutAppointment