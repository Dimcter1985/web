import { build, fake, incrementingId } from 'test-data-bot'
import { salonServiceFactory } from './categoriesFactory'
import { salonFactory } from './salonsFactory'

export const loyaltyProgramFactory = build<ILoyaltyProgram>('LoyaltyProgram').fields({
  id: incrementingId(),
  visits: fake(f => f.random.number({ min: 5, max: 10 })),
  kind: fake(f => f.random.word()),
  value: fake(f => f.random.number({ min: 1, max: 5 })),
  salonServices: [salonServiceFactory()],
  salonServiceIds: [incrementingId()],
  description: fake(f => f.lorem.sentence()),
  photo: fake(f => f.image.imageUrl()),
  salon: salonFactory(),
  salonId: incrementingId(),
  salonName: fake(f => f.company.companyName()),
  enabled: fake(f => f.random.boolean()),
})

export const loyaltyCardFactory = build<ILoyaltyCard>('LoyaltyCard').fields({
  id: incrementingId(),
  customerId: incrementingId(),
  loyaltyProgramId: incrementingId(),
  visits: fake(f => f.random.number({ min: 5, max: 10 })),
  score: fake(f => f.random.number({ min: 1, max: 5 })),
  loyaltyProgram: loyaltyProgramFactory(),
})