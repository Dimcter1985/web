import { build, fake, incrementingId } from 'test-data-bot'
import { Statuses } from 'core/consts/appointments'
import moment from 'moment'

import { appointmentServiceFactory, customServiceFactory } from './servicesFactory'
import { salonServiceFactory, serviceFactory } from './categoriesFactory'
import { technicianFactory } from './technicianFactory'
import { customerFactory } from './customerFactory'
import { discountFactory } from './discountFactory'
import { reviewFactory } from './reviewFactory'
import { salonFactory, salonListFactory } from './salonsFactory'

export const appointmentFactory = build<IAppointment>('Appointment').fields({
  additionalTip: fake(f => f.random.number(20)),
  appVersion: fake(f => f.random.number(50)),
  appointmentServices: [appointmentServiceFactory()],
  bookedAt: moment().toISOString(),
  comission: fake(f => f.random.number(200)),
  cost: fake(f => f.random.number({ min: 1, max: 500 })),
  createdAt: moment().toDate(),
  credits: fake(f => f.random.number(20)),
  customServices: [customServiceFactory()],
  customer: customerFactory(),
  customerId: incrementingId(),
  deviceType: 'web',
  discount: discountFactory(),
  discountAmount: fake(f => f.random.number(50)),
  discountId: incrementingId(),
  duration: fake(f => f.random.number(60)),
  endsAt: moment().add(1, 'hour').toISOString(),
  id: incrementingId(),
  loyaltyCardId: incrementingId(),
  loyaltyDiscount: fake(f => f.random.number(10)),
  paymentMethodNonce: fake(f => f.random.uuid()),
  penaltyFee: fake(f => f.random.number(10)),
  processingFee: fake(f => f.random.number(10)),
  referralCode: fake(f => f.random.word()),
  referralDiscount: fake(f => f.random.number(10)),
  review: reviewFactory(),
  salon: salonFactory(),
  salonAmount: fake(f => f.random.number({ min: 100, max: 1000 })),
  salonId: incrementingId(),
  salonServices: [salonServiceFactory()],
  serviceFee: fake(f => f.random.number(10)),
  specialRequests: fake(f => f.lorem.sentence()),
  startsAt: moment().add(1, 'hour').toDate(),
  status: Statuses.BOOKED,
  tax: fake(f => f.random.number({ min: 10, max: 100 })),
  technician: technicianFactory(),
  technicianId: incrementingId(),
  totalAmount: fake(f => f.random.number({ min: 100, max: 1000 })),
  type: '',
  tip: fake(f => f.random.number(20)),
  updatedAt: moment().toDate(),
  cardFingerprintId: fake(f => f.random.number({ min: 10000, max: 100000 })),
})

export const listAppointmentFactory = build<IListAppointment>('ListAppointment').fields({
  id: incrementingId(),
  status: Statuses.BOOKED,
  startsAt: moment().add(1, 'hour').toDate(),
  endsAt: moment().add(2, 'hour').toISOString(),
  tax: fake(f => f.random.number({ min: 10, max: 100 })),
  cost: fake(f => f.random.number({ min: 1, max: 500 })),
  appointmentServices: [appointmentServiceFactory()],
  duration: fake(f => f.random.number(20)),
  discountAmount: fake(f => f.random.number(50)),
  credits: fake(f => f.random.number(20)),
  serviceFee: fake(f => f.random.number(10)),
  loyaltyDiscount: fake(f => f.random.number(10)),
  tip: fake(f => f.random.number(20)),
  totalAmount: fake(f => f.random.number({ min: 100, max: 1000 })),
  salon: salonListFactory(),
  technicianId: incrementingId(),
  customServices: [serviceFactory()],
  cardFingerprintId: fake(f => f.random.number({ min: 10000, max: 100000 })),
  review: {
    id: incrementingId(),
  },
})