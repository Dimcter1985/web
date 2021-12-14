export default class ApiError extends Error {
  errors: any

  constructor(message: string, errors?: any) {
    super(message)
    if (Error.captureStackTrace) Error.captureStackTrace(this, ApiError)
    this.name = 'ApiError'
    this.message = message
    this.errors = errors
  }
}