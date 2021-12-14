import { act, renderHook } from '@testing-library/react-hooks'

import fetchSalon from 'core/api/salons/fetchSalon'
import { salonFactory, waitFor } from 'core/spec'
import useSalonReviews from '../useSalonReviews'

jest.mock('core/api/salons/fetchSalon', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useSalonReviews', () => {
  def('props', () => ({
    salonId: get.salonId || 1,
    queryFields: get.queryFields,
  }))

  def('subject', () => renderHook(() => useSalonReviews(get.props)))

  def('response', salonFactory)

  beforeEach(() => {
    // @ts-ignore
    fetchSalon.mockResolvedValue(get.response)
  })

  it('has correct initial state', async () => {
    const { result } = get.subject
    await act(async () => {
      await waitFor(async() => {
        expect(result.current.salon).toEqual(get.response)
        expect(result.current.loading).toEqual(false)
      })
    })
  })
})
