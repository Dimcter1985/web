import { build, fake, incrementingId } from 'test-data-bot'

import { freeSlotSalonServiceFactory, salonCategoryFactory } from './categoriesFactory'
import { imageFactory, locationFactory } from './common'
import { workHoursFactory } from './workHoursFactory'
import { reviewFactory } from './reviewFactory'
import { photoFactory } from './photoFactory'

export const salonListFactory = build<IListSalon>('SalonSearchList').fields({
  id: incrementingId(),
  address: fake(f => f.address.streetAddress()),
  addressLine2: fake(f => f.address.streetAddress()),
  name: fake(f => f.company.companyName()),
  image: imageFactory(),
  city: fake(f => f.address.city()),
  state: fake(f => f.address.state()),
  zipCode: fake(f => f.address.zipCode()),
  reviewsCount: fake(f => f.random.number(5)),
  location: locationFactory(),
  averageRating: fake(f => f.random.number(5)),
  overallRating: fake(f => f.random.number(5)),
  tax: 8.875,
  tipping: fake(f => f.random.boolean()),
  slug: fake(f => f.company.companyName()),
  activeLoyaltyProgram: {
    id: incrementingId(),
  },
  timezone: fake(f => f.address.timeZone),
  nonSnailz: fake(f => f.random.boolean),
})

export const salonSettingsFactory = build<ISalonSettings>('SalonSettings').fields({
  appointmentServicesLimit: fake(f => f.random.number(5)),
  cancelationFee: fake(f => f.random.number(10)),
  cancelationFeePeriod: fake(f => f.random.number({ min: 10, max: 30 })),
  cancelationFeeType: fake(f => f.random.number(1)),
  getPaidVisibleFrom: fake(f => f.random.number(5)),
  noShowFee: fake(f => f.random.number(100)),
  noShowFeeType: fake(f => f.random.number(1)),
  noShowVisibleFrom: fake(f => f.random.number(5)),
  pointsByReview: fake(f => f.random.number(5)),
  processingFixed: fake(f => f.random.number(0.3)),
  processingRelative: fake(f => f.random.number(3)),
})

export const freeSlotsFactory = build<IListFreeSlot>('ListFreeSlot').fields({
  salon: { ...salonListFactory(), timezone: 'America/New_York' },
  salonServices: [freeSlotSalonServiceFactory()],
  slots: [{
    slots: [new Date()],
    technicianId: incrementingId(),
  }],
})

export const salonFactory = build<ISalon>('Salon').fields({
  id: incrementingId(),
  name: fake(f => f.company.companyName()),
  city: fake(f => f.address.city()),
  location: locationFactory(),
  image: imageFactory(),
  activeLoyaltyProgram: null,
  address: fake(f => f.address.streetAddress()),
  addressLine2: fake(f => f.address.secondaryAddress()),
  averageRating: fake(f => f.random.number(5)),
  cleanlinessRating: fake(f => f.random.number(5)),
  commision: fake(f => f.random.number(20)),
  disabled: fake(f => f.random.boolean()),
  email: fake(f => f.internet.email()),
  featured: incrementingId(),
  managerName: fake(f => f.name.firstName()),
  minTimeOffset: fake(f => f.random.number(30)),
  mobile: fake(f => f.phone.phoneNumber()),
  notes: fake(f => f.lorem.sentence()),
  notificationNumber: fake(f => f.phone.phoneNumber()),
  overallRating: fake(f => f.random.number(5)),
  ownerName: fake(f => f.name.firstName()),
  phone: fake(f => f.phone.phoneNumber()),
  photos: [photoFactory()],
  processingFee: fake(f => f.random.boolean()),
  professionalismRating: fake(f => f.random.number(5)),
  promptnessRating: fake(f => f.random.number(5)),
  reviews: [reviewFactory()],
  reviewsCount: 1,
  salonCategories: [salonCategoryFactory()],
  slug: fake(f => f.lorem.slug()),
  state: fake(f => f.address.state()),
  tax: 8.875,
  timezone: fake(f => f.address.timeZone),
  tipping: fake(f => f.random.boolean()),
  workHours: workHoursFactory(),
  zipCode: fake(f => f.address.zipCode()),
  neighborhoods: [], 
  nonSnailz: false, 
  priceRange: null, 
  seoTitle: null, 
  seoDescription: null,
  description: null,
  speciality: null,
})
