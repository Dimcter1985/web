export type ICartService = ICustomService

export interface ICartItem {
  service: ICartService
  quantity: number
}

export interface ICart {
  salonId: number | null
  items: ICartItem[]
  timeSlot: ITimeSlot | null
  appointment: IListAppointment | null
}

export interface IAddCartItem {
  salonId: number
  service: ICustomService
  quantity?: number
}

export interface IChangeServiceQuantity {
  serviceId: number
  quantity: number
}

export interface ITimeSlot {
  technicianId: number,
  startsAt: Date,
}
