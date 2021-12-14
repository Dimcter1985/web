declare module '*.png'
declare module '*.jpg'
declare module '*.gif'

type Nullable<T> = { [P in keyof T]: T[P] | null }

declare interface IFormErrors {
  [key: string]: string
}

declare interface ILocation {
  lat: number
  lng: number
}

declare interface ISuccess {
  success: boolean
}

declare interface IImage {
  url: string
  thumbUrl: string
}

declare type INullableImage = IImage | null

declare type ImageVariant = 'normal' | 'thumb'

declare interface IModel {
  id: number
}

declare interface IEnvironment {
  [name: string]: string
}

declare namespace NodeJS  {
  interface Global { // eslint-disable-line
    token: string | null
    baseUrl: string | null
  }
}

declare interface IIconProps {
  width?: number | string
  height?: number | string
  color?: string
}

declare type IDate = import('moment').Moment | Date | string

declare type ISortDirection = import('core/consts/sorting').SortDirections

declare type IFreeSlotsSortBy = import('core/consts/sorting').FreeSlotsSortBy

declare type IAppointmentSortBy = import('core/consts/sorting').AppointmentSortBy

declare type ISalonsSortBy = import('core/consts/sorting').SalonsSortBy

declare type IStatuses = (import('core/consts/appointments').Statuses)[]