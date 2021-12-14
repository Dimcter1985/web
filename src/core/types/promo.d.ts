declare interface IReferralDiscount {
  amount: number
  code: string
  type: string
}

declare interface ICalculatedDiscount {
  amount: number
  code: string
  id: number
  type: string
}