import ApiError from './apiError'

interface ICastErrorParams<T> {
  data: T
  errors?: IPayloadError[],
}

export function castError<T>({ data, errors }: ICastErrorParams<T>): T {
  if (!errors) return data
  if (errors && errors.length) {
    throw new ApiError(errors[0].fullMessage || errors[0].message, errors)
  }
  throw new ApiError('Undefined error')
}

export default castError
