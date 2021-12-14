declare interface ICoreServices {
  categories: IServiceCategory[]
  services: ICommonService[]
}

declare interface ICommonService extends IModel {
  id: number
  name: string
  position: number
  inFavorites: boolean
}

declare interface IService extends IModel {
  name: string
  cost: number
}

declare interface IServicePack<T extends IService = IService> {
  service: T
  quantity: number
}

declare type ICustomService = IService

declare interface IAppointmentService extends IService {
  appointmentId: number
  salonServiceId: number
  name: string
  cost: number
  quantity: number
  totalAmount: number
}

declare interface ISalonService extends IService {
  description: string
  duration: number
  salonId: number
  categoryId: number
}

declare interface IServiceVariant extends IModel {
  cost: number
  distance: number
  duration: number
  rating?: number
  salon: ISalon
  salonId: number
  serviceIds: number[]
  slots: IFreeSlot[]
}

declare type IFreeSlotSalonService = ICustomService & {
  services: Array<Pick<IService, 'id'>>,
}

declare interface IListFreeSlot {
  salon: IListSalon & { timezone: string }
  slots: IFreeSlot[]
  salonServices: IFreeSlotSalonService[]
}

declare type IListAppointmentService = Pick<IAppointmentService,
  | 'id'
  | 'name'
  | 'cost'
  | 'quantity'
  | 'salonServiceId'
>