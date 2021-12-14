import { build, fake, incrementingId } from 'test-data-bot'
import moment from 'moment'

import { IAppointmentReview } from 'core/hooks/useAppointmentReview/types'
import { customerFactory } from './customerFactory'
import { photoFactory } from './photoFactory'

export const appointmentReviewFactory = build<IAppointmentReview>('AppointmentReview').fields({
  review: {
    averageRating: fake(f => f.random.number(5)),
    cleanlinessRating: fake(f => f.random.number(5)),
    comment: fake(f => f.lorem.paragraph()),
    createdAt: moment().toDate(),
    id: incrementingId(),
    overallRating: fake(f => f.random.number(5)),
    photos: [photoFactory()],
    professionalismRating: fake(f => f.random.number(5)),
    promptnessRating: fake(f => f.random.number(5)),
  },
})

export const reviewFactory = build<IReview>('Review').fields({
  anonymous: fake(f => f.random.boolean()),
  appointmentId: incrementingId(),
  appointment: {} as IAppointment,
  averageRating: fake(f => f.random.number(5)),
  cleanlinessRating: fake(f => f.random.number(5)),
  comment: fake(f => f.lorem.paragraph()),
  createdAt: moment().toDate(),
  customer: customerFactory(),
  id: incrementingId(),
  overallRating: fake(f => f.random.number(5)),
  photos: [photoFactory()],
  professionalismRating: fake(f => f.random.number(5)),
  promptnessRating: fake(f => f.random.number(5)),
  reviewerName: fake(f => `${f.name.firstName()} ${f.name.lastName()}`),
  salonAnswer: fake(f => f.lorem.sentence()),
  salonId: incrementingId(),
  serviceNames: [fake(f => f.lorem.word())],
  updatedAt: moment().add(1, 'hour').toDate(),
})