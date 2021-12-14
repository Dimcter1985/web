import { client, referralDiscountFactory } from 'spec'
import { REFERRAL } from 'core/consts'
import checkReferral from '../checkReferral'

describe('checkReferral', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('discount', () => referralDiscountFactory())
  def('response', () => ({ checkReferral: { data : get.discount }}))

  const params = {
    code: 'CODE',
    appointmentId: 1,
  }

  it('calls query', async () => {
    await checkReferral(params)
    expect(client.query).toHasGraphQLQueryCall('checkReferral')
    expect(client.query).toHasCalledWithVariables({ filters: params })
  })

  it('returns referral data', async () => {
    const payload = await checkReferral(params)
    expect(payload).toEqual({
      code: params.code,
      type: REFERRAL,
      data: { ...get.discount, type: REFERRAL },
    })
  })
})
