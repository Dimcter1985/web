declare interface ITechnician extends IModel {
  address: string
  allSalonServices: boolean
  city: string
  email: string
  firstName: string
  id: number
  lastName: string
  mobile: string
  nick: string
  state: string
  timeSlots: string[]
  zipCode: string
}

declare interface IAvailableTimeSlot {
  slot: number
  technicianId: number
}
