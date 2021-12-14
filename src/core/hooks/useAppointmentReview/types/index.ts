export type IAppointmentReview = {
  review: Pick<IReview,
    | 'id'
    | 'averageRating'
    | 'promptnessRating'
    | 'professionalismRating'
    | 'cleanlinessRating'
    | 'comment'
    | 'overallRating'
    | 'createdAt'
  > & {
    photos: Pick<IPhoto, 'id' | 'image'>[]
  }
}