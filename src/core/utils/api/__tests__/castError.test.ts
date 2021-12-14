import { payloadErrorFactory } from 'core/spec'
import castError from '../castError'

describe('castError', () => {
  it('returns data', () => {
    const payload = { data: { test: 1 }, errors: undefined }
    expect(castError(payload)).toEqual(payload.data)
  })

  it('returns errors', () => {
    const error = payloadErrorFactory()
    const payload = { data: undefined, errors: [error] }

    expect(() => castError(payload)).toThrow()
  })
})