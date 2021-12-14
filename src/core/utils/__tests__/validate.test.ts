import { def, get } from 'core/spec'
import validate from '../validate'

describe('validate', () => {
  const constraints = {
    email: {
      email: {
        message: '^Email is not correct',
      },
      presence: true,
    },
    password: {
      length: { minimum: 3 },
      presence: true,
    },
    phoneNumber: {
      phone: true,
    },
  }

  def('defaultValues', () => ({
    email: 'test@email.com',
    password: '123',
    phoneNumber: '+19171112233',
  }))

  it('has no errors', () => {
    const values = get.defaultValues
    expect(validate(values, constraints)).toEqual(undefined)
  })

  it('has correct email error message', () => {
    const values = { ...get.defaultValues, email: 'test@email', }
    expect(validate(values, constraints)).toEqual(
      expect.objectContaining({
        email: ['Email is not correct'],
      })
    )}
  )

  it('has correct password length error message', () => {
    const values = { ...get.defaultValues, password: '1' }
    expect(validate(values, constraints)).toEqual(
      expect.objectContaining({
        password: ['Password is too short (minimum is 3 characters)'],
      })
    )}
  )

  it('has correct phone number error message', () => {
    const values = { ...get.defaultValues, phoneNumber: '11122233' }
    expect(validate(values, constraints)).toEqual(
      expect.objectContaining({
        phoneNumber: ['Phone number is not correct'],
      })
    )}
  )

  describe('Credit card verification', () => {
    const cardConstraints = {
      cardNumber: {
        creditCard: true,
      }
    }

    it('has correct credit card error message', () => {
      const values = { cardNumber: '41111111111' }
      expect(validate(values, cardConstraints)).toEqual(
        expect.objectContaining({
          cardNumber: ['Card number is not valid'],
        })
      )}
    )

    it('has no errors', () => {
      const values = { cardNumber: '4111111111111111' }
      expect(validate(values, cardConstraints)).toEqual(undefined)
    })
  })
})
