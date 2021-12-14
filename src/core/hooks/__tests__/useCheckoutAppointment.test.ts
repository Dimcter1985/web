import { act, renderHook } from '@testing-library/react-hooks'

import fetchAppointment from 'core/api/appointments/fetchAppointment'
import { FORM_FIELDS } from 'core/forms/checkout/consts'
import { def, get, waitFor } from 'core/spec'
import { PROMO, REFERRAL } from 'core/consts'
import useCheckoutAppointment from '../useCheckoutAppointment'

jest.mock('core/api/appointments/fetchAppointment', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useCheckoutAppointment', () => {
  def('subject', () => renderHook(() => useCheckoutAppointment(get.appointment)))

  describe('Without an appointment', () => {
    it('correct default values', async () => {
      const { current } = get.subject.result
      await waitFor(() => {
        expect(current.initialCheckoutValues).toEqual({})
      })
    })
  })

  describe('With an appointment', () => {
    def('appointment', () => ({
      cost: get.cost || 100,
      credits: 10,
      discount: get.discount,
      referralCode: get.referralCode,
      referralDiscount: get.referralDiscount,
      loyaltyCardId: get.loyaltyCardId,
      loyaltyDiscount: get.loyaltyDiscount,
      specialRequests: 'Request',
      tip: get.tip || 20,
    }))

    beforeEach(() => {
      // @ts-ignore
      fetchAppointment.mockResolvedValue(get.appointment)
    })

    const isContainObject = (subject: string, object: Record<string, unknown>) => {
      it(subject, async () => {
        const { result } = get.subject
        await act(async () => {
          await waitFor(() => {
            expect(result.current.initialCheckoutValues).toEqual(
              expect.objectContaining(object)
            )
          })
        })
      })
    }

    isContainObject('correct default values', {
      [FORM_FIELDS.CREDITS]: 10,
      [FORM_FIELDS.TIP_INDEX]: 0,
      [FORM_FIELDS.SPECIAL_REQUESTS]: 'Request',
    })

    describe('with promo discount', () => {
      def('discount', () => ({
        amount: 10,
        code: 'ABC',
        type: PROMO,
      }))

      isContainObject('has promo discount', {
        [FORM_FIELDS.PROMO]: {
          amount: 10,
          code: 'ABC',
          type: PROMO,
        },
        [FORM_FIELDS.PROMO_CODE]: 'ABC',
      })
    })

    describe('with referral discount', () => {
      def('referralCode', () => 'REFCODE')
      def('referralDiscount', () => 50)

      isContainObject('has referral discount', {
        [FORM_FIELDS.PROMO]: {
          amount: 50,
          code: 'REFCODE',
          type: REFERRAL,
        },
        [FORM_FIELDS.PROMO_CODE]: 'REFCODE',
      })
    })

    describe('with percentage tips', () => {
      def('cost', () => 10)
      def('tip', () => 4)

      isContainObject('has correct tips', {
        [FORM_FIELDS.TIP_INDEX]: 1,
      })
    })

    describe('with cash tips', () => {
      def('cost', () => 100)
      def('tip', () => 30)

      isContainObject('has correct tips', {
        [FORM_FIELDS.TIP_INDEX]: 2,
      })
    })

    describe('with loyalty card id', () => {
      def('loyaltyCardId', () => 10)

      isContainObject('has correct tips', {
        [FORM_FIELDS.LOYALTY_CARD_ID]: 10,
      })
    })

    describe('with loyalty discount', () => {
      def('loyaltyDiscount', () => 100)

      isContainObject('has correct tips', {
        [FORM_FIELDS.LOYALTY_DISCOUNT]: 100,
      })
    })
  })
})

