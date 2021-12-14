import { build } from 'test-data-bot'
import ApiError from 'core/utils/api/apiError'

export const payloadErrorFactory = build<IPayloadError>('RequestError').fields({
  attribute: null,
  code: 'code',
  fullMessage: null,
  message: 'error message',
})

export const errorResponseFactory = (errors: IPayloadError | null = null): IMutationResult<any> => ({
  data: null,
  errors: errors ? [errors] : [payloadErrorFactory()],
})

export const apiErrorFactory = build<ApiError>().fields({
  name: 'ApiError',
  message: 'error message',
  errors: [payloadErrorFactory()],
})


export const baseErrorFactory = (message: string, attribute?: string): ApiError => (
  apiErrorFactory({
    message,
    errors: [payloadErrorFactory({ message, attribute })],
  })
)