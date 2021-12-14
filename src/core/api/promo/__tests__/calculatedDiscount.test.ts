import { client, calculatedDiscountFactory } from 'spec'
import { PROMO } from 'core/consts'
import calculatedDiscount from '../calculatedDiscount'

describe('calculatedDiscount', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('discount', () => calculatedDiscountFactory())
  def('response', () => ({ calculatedDiscount: { data : get.discount }}))

  const params = {
    payload: {
      code: 'CODE',
      salonId: 1,
      services: [{ serviceId: 1, quantity: 1 }],
    }
  }

  it('calls query', async () => {
    await calculatedDiscount(params.payload)
    expect(client.query).toHasGraphQLQueryCall('calculatedDiscount')
    expect(client.query).toHasCalledWithVariables(params)
  })

  it('returns discount data', async () => {
    const payload = await calculatedDiscount(params.payload)
    expect(payload).toEqual({
      type: PROMO,
      data: { ...get.discount, type: PROMO },
    })
  })
})
