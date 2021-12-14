import { act, renderHook } from '@testing-library/react-hooks'

import { buildMany, globalSettingsFactory, servicePackFactory, waitFor } from 'core/spec'
import fetchGlobalSettings from 'core/api/settings/fetchGlobalSettings'
import useCheckoutReceipt from '../useCheckoutReceipt'

jest.mock('core/api/settings/fetchGlobalSettings', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useCheckoutReceipt', () => {
  const params = {
    services: buildMany(servicePackFactory, 3),
    credits: 10,
    taxes: 20,
    tipIndex: 3,
    discount: 10,
  }

  def('subject', () => renderHook(() => useCheckoutReceipt(params)))

  beforeEach(() => {
    // @ts-ignore
    fetchGlobalSettings.mockResolvedValue(globalSettingsFactory())
  })

  it('returns receipt details', async () => {
    const { current } = get.subject.result

    await act(async () => {
      await waitFor(() => {
        expect(current).toHaveProperty('cost')
        expect(current).toHaveProperty('taxes')
        expect(current).toHaveProperty('serviceFee')
        expect(current).toHaveProperty('tip')
        expect(current).toHaveProperty('discount')
        expect(current).toHaveProperty('subtotal')
        expect(current).toHaveProperty('total')
        expect(current).toHaveProperty('pointz')
        expect(current).toHaveProperty('credits')
        expect(current).toHaveProperty('loyalty')
        expect(current).toHaveProperty('commonDiscount')
      })
    })
  })
})
