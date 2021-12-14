type IExtendDiscount = Pick<IDiscount, 'code' | 'id'>

export interface IExtendListAppointment {
  cardFingerprintId?: number
  discount?: IExtendDiscount
  specialRequests?: string
  credits?: number
}

export interface IValues {
  specialRequests: string
  cardId: number | null
  tipIndex: number | null
  usingCredit: boolean
  discount: IDiscount | null
  serviceFee?: number
}
