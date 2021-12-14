declare interface IReview extends IModel {
  anonymous: boolean
  appointmentId: number
  appointment: IAppointment | null
  averageRating: number
  cleanlinessRating: number
  comment: string
  createdAt: Date
  customer: ICustomer
  id: number
  overallRating: number
  photos: IPhoto[]
  professionalismRating: number
  promptnessRating: number
  reviewerName: string
  salonAnswer: string
  salonId: number
  serviceNames: string[]
  updatedAt: Date
}