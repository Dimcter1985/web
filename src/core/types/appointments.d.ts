declare interface IAppointment extends IModel {
  additionalTip: number | null
  appVersion: number | null
  appointmentServices: IAppointmentService[]
  bookedAt: string
  comission: number
  cost: number
  createdAt: Date
  credits: number
  customServices: ICustomService[]
  customer: ICustomer
  customerId: number
  deviceType: string | null
  discount: IDiscount
  discountAmount?: number
  discountId: number | null
  duration: number
  endsAt: string
  id: number
  cardFingerprintId: number | null
  loyaltyCardId: number | null
  loyaltyDiscount?: number
  paymentMethodNonce: string | null
  penaltyFee: number | null
  processingFee: number | null
  referralCode: string | null
  referralDiscount: number | null
  review: IReview
  salon: ISalon
  salonAmount: number
  salonId: number
  salonServices: ISalonService[]
  serviceFee: number
  specialRequests: string | null
  startsAt: Date
  status: import('core/consts/appointments').Statuses
  tax: number
  tip: number
  technician: ITechnician
  technicianId: number
  totalAmount: number
  type: string
  updatedAt: Date
}

declare type IAppointmentCostDetails = {
  cost: number
  taxes: number
  serviceFee: number
  tip: number
  discount: number
  subtotal: number
  total: number
  pointz: number
  credits: number
  loyalty: number
  commonDiscount: number
}

declare interface IUserAppointmets {
  past: IAppointment[]
  future: IAppointment[]
  salons: ISalon[]
}

declare type IRecentAppointment = {
  salon: IListSalon
  review?: Pick<IReview, 'id'>
} & Pick<IAppointment,
  | 'id'
  | 'startsAt'
  | 'endsAt'
  | 'status'
>

declare type IListAppointment = Pick<IAppointment,
  | 'id'
  | 'status'
  | 'startsAt'
  | 'endsAt'
  | 'tax'
  | 'cost'
  | 'duration'
  | 'discountAmount'
  | 'credits'
  | 'serviceFee'
  | 'loyaltyDiscount'
  | 'tip'
  | 'totalAmount'
  | 'technicianId'
  | 'cardFingerprintId'
> & {
  appointmentServices: IListAppointmentService[]
  customServices: ICustomService[]
  salon: IListSalon
  review?: Pick<IReview, 'id'>
}

declare interface IAppointmentReceipt {
  subtotal: number
  credits?: number
  discount?: number
  serviceFee?: number
  loyalty?: number | null
  tip: number
  taxes: number
  total: number
}