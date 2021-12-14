import { useCallback, useEffect, useState } from 'react'
import { useField } from 'react-final-form'

import { FORM_FIELDS } from 'core/forms/checkout/consts'
import fetchPromo from 'core/api/promo/fetchPromo'
import { IService } from 'core/api/promo/calculatedDiscount'

export interface IUsePromoCode {
  error?: Error
  checkCode: (code: string) => void
  resetCode: () => void
  promoCode: string | null,
  submitted: boolean
}

interface IParams {
  salonId: number
  services: IService[]
}

const usePromoCode = ({ salonId, services }: IParams): IUsePromoCode => {
  const [error, setError] = useState<Error>()
  const [submitted, setSubmitted] = useState(false)

  const { input } = useField<IReferralDiscount | ICalculatedDiscount>(FORM_FIELDS.PROMO)

  const checkCode = useCallback(async (code: string) => {
    try {
      setError(undefined)
      const promo = await fetchPromo({
        referral: { code },
        discount: { code, salonId, services },
      })
      input.onChange(promo)
    } catch (e) {
      setError(e)
    } finally {
      setSubmitted(true)
    }
  }, [fetchPromo, salonId, services])

  useEffect(() => {
    if (!!input.value && !submitted) setSubmitted(true)
  }, [input.value])

  const resetCode = useCallback(() => {
    input.onChange(undefined)
    setSubmitted(false)
  }, [input])

  return {
    promoCode: input.value?.code || null,
    checkCode,
    error,
    resetCode,
    submitted,
  }
}

export default usePromoCode