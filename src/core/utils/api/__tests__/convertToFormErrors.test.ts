import { FORM_ERROR } from 'final-form'
import convertToFormErrors from '../convertToFormErrors'

describe('convertToFormErrors', () => {
  it('converts the error correctly', () => {
    const errorMessage = 'Test error'
    const error = new Error(errorMessage)

    expect(convertToFormErrors(error)).toEqual({
      [FORM_ERROR]: `${errorMessage}`,
    })
  })
})
