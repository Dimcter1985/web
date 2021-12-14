declare interface IAppContext {
  isLogged: boolean
  logIn: (user: ICustomer) => Promise<null | undefined>
  logOut: () => Promise<null | undefined>
  updateUser: (user: IRefreshCustomer) => Promise<null | undefined>
  refreshUser: () => Promise<null | undefined>
  user: ICustomer | null
  userId: number | null
  ready: boolean
}

declare interface IAuthContext {
  sendSignInCode: (values: ISignInFormValues) => Promise<void>
  sendSignUpCode: (values: ISignUpFormValues) => Promise<void>
  checkCode: (values: ICodeFormValues) => Promise<IUser | void>
}

declare interface IServicesContext {
  categories: IListCategory[]
  services: ICommonService[]
  fetchServices: () => Promise<void | null>
  loaded: boolean
}

declare interface IStorageContext {
  storage: IStorage
}

declare interface IGeolocationContext {
  location: ILocation
  ready: boolean
  fetchCurrectPosition: () => Promise<void>
}

declare type IAppointmentsContext = import('core/hooks/useList').IUseList<IListAppointment>

declare interface IMinimalService extends IModel {
  name: string
} 

declare interface IBookFormService<T extends IMinimalService = IMinimalService> {
  service: T
  quantity: number
}

declare interface IBookFormValues extends IAvailableTimeSlot {
  services: IServicePack[]
  customServices: ICustomService[]
  date: string
}