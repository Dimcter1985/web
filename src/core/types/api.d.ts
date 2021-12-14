declare interface IPagination {
  page: number
  size: number
}

declare type ImageType = 'JPEG' | 'PNG' | 'WEBP'

declare type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/webp'

declare interface IUploadFile {
  uri: string
  type: ImageMimeType
  name: string
}

declare interface IResult {
  success: boolean
}

declare interface IMutationResult<T> {
  data: T,
  errors?: IPayloadError[]
}

declare interface IResponseWithTotal<T> {
  data: T[]
  total: number
}

declare type AppointmentsBatch = 'upcoming' | 'past'
