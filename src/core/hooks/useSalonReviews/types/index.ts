export type ISalonReview = Pick<IReview,
  | 'id'
  | 'averageRating'
  | 'createdAt'
  | 'comment'
  | 'serviceNames'
> & {
  customer: Pick<IUser, 'id' | 'avatar' | 'firstName' | 'lastName'>
  photos: Pick<IPhoto, 'id' | 'image'>[]
}

export type ISalonWithReviews = Pick<ISalon,
  | 'cleanlinessRating'
  | 'promptnessRating'
  | 'professionalismRating'
  | 'overallRating'
> & {
  reviews: ISalonReview[]
}
