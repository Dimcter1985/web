import { errorResponseFactory, client, reviewFactory, uploadImageFactory } from 'core/spec'
import ApiError from 'core/utils/api/apiError'
import createReview from '../createReview'

describe('createReview', () => {
  beforeEach(() => {
    client.query.mockResolvedValue({ data: get.response })
  })

  def('params', () => ({ queryFields: 'id', ...get.payload }))

  describe('Success', () => {
    def('review', reviewFactory)
    def('response', () => ({ createReview: { data: get.review } }))

    def('payload', () => ({
      appointmentId: 1,
      professionalismRating: 5,
      promptnessRating: 4,
      cleanlinessRating: 3,
      overallRating: 2,
      comment: 'Great salon and services',
      photosAttributes: [
        { image: uploadImageFactory() },
        { image: uploadImageFactory() },
        { image: uploadImageFactory() },
      ]
    }))

    it('calls mutation', async () => {
      await createReview(get.params)
      expect(client.query).toHasGraphQLMutationCall('createReview')
      expect(client.query).toHasCalledWithVariables({ payload: get.payload })
    })

    it('returns review data', async () => {
      const review = await createReview(get.params)
      expect(review).toEqual(get.review)
    })
  })

  describe('Failure', () => {
    def('response', () => ({ createReview: errorResponseFactory() }))

    it('returns api error', async () => {
      await expect(createReview(get.params)).rejects.toThrow()
    })
  })
})