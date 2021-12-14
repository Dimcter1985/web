import calculatedDiscount, { IDiscountParams } from './calculatedDiscount'
import checkReferral, { IReferralParams } from './checkReferral'

const REFERRAL_MASK = /^RF.{3}\d{4}SZ$/

interface IParams {
  referral: IReferralParams
  discount: IDiscountParams
}

export default function fetchPromo({ referral, discount }: IParams): Promise<IReferralDiscount | ICalculatedDiscount> {
  return REFERRAL_MASK.test(referral.code.toUpperCase())
    ? checkReferral(referral)
    : calculatedDiscount(discount)
}