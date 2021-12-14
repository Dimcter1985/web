import { def, get } from 'core/spec'
import calculatedDiscount from '../calculatedDiscount'
import checkReferral from '../checkReferral'
import fetchPromo from '../fetchPromo'

jest.mock('../calculatedDiscount', () => jest.fn())
jest.mock('../checkReferral', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('fetchPromo', () => {
  def('params', () => ({
    referral: {
      code: get.code,
      appointmentId: 2,
    },
    discount: {
      code: get.code,
      salonServiceIds: [1],
      salonId: 1,
      appointmentId: 1,
    }
  }))

  describe('Discount flow', () => {
    def('code', () => 'DISCOUNT')

    it('invokes correct api function', () => {
      fetchPromo(get.params)
      expect(calculatedDiscount).toBeCalledWith(get.params.discount)
    })
  })

  describe('Referral flow', () => {
    def('code', () => 'RFGHH5680SZ')

    it('invokes correct api function', () => {
      fetchPromo(get.params)
      expect(checkReferral).toBeCalledWith(get.params.referral)
    })
  })
})
