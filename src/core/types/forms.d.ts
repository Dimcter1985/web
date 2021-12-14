declare interface IFiltersValues {
  withTipsOnly?: boolean
  maxDistance?: number
  sortBy?: string
}

declare interface IDateTimeSlotValues {
  date: Date
  timeSlot: IAvailableTimeSlot
}

declare interface IEditProfileValues {
  fullName: string
  birthday?: string
}

declare interface ICreditCardValues {
  cardholderName: string
  number: string
  expirationDate: string
  cvv: string
  postalCode: string
  default: boolean
}

declare interface ICheckoutValues {
  tipIndex: number
  specialRequests?: string
  credits?: number
  loyaltyCardId?: number
  loyaltyDiscount?: number
  promo?: IReferralDiscount | ICalculatedDiscount
  creditCardId: number
}

declare interface ICustomServiceValues {
  id: number
  name: string
  cost: string
}