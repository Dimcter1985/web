import { act, renderHook } from '@testing-library/react-hooks'

import fetchAppointment from 'core/api/appointments/fetchAppointment'
import { appointmentReviewFactory, reviewFactory, waitFor } from 'core/spec'
import useAppointmentReview from '../useAppointmentReview'

jest.mock('core/api/appointments/fetchAppointment', () => jest.fn())

afterAll(jest.clearAllMocks)

describe('useAppointmentReview', () => {
  def('props', () => ({
    appointmentId: get.appointmentId || 1,
    queryFields: get.queryFields,
  }))

  def('subject', () => renderHook(() => useAppointmentReview(get.props)))

  beforeEach(() => {
    // @ts-ignore
    fetchAppointment.mockResolvedValue(get.response)
  })

  describe('With all fields', () => {
    def('response', appointmentReviewFactory)

    it('has correct initial state', async () => {
      const { result } = get.subject
      await act(async () => {
        await waitFor(async() => {
          expect(result.current.review).toEqual(get.response.review)
          expect(result.current.hasComment).toEqual(true)
          expect(result.current.hasPhotos).toEqual(true)
          expect(result.current.loading).toEqual(false)
        })
      })
    })
  })

  describe('Without comments', () => {
    def('response', () => appointmentReviewFactory({
      review: reviewFactory({ comment: undefined}),
    }))

    it('has correct initial state', async () => {
      const { result } = get.subject
      await act(async () => {
        await waitFor(async() => {
          expect(result.current.review).toEqual(get.response.review)
          expect(result.current.hasComment).toEqual(false)
          expect(result.current.hasPhotos).toEqual(true)
          expect(result.current.loading).toEqual(false)
        })
      })
    })
  })

  describe('Without photos', () => {
    def('response', () => appointmentReviewFactory({
      review: reviewFactory({ photos: [] }),
    }))

    it('has correct initial state', async () => {
      const { result } = get.subject
      await act(async () => {
        await waitFor(async() => {
          expect(result.current.review).toEqual(get.response.review)
          expect(result.current.hasComment).toEqual(true)
          expect(result.current.hasPhotos).toEqual(false)
          expect(result.current.loading).toEqual(false)
        })
      })
    })
  })
})
