import { build, fake, incrementingId } from 'test-data-bot'

export const rewardFactory = build<IReward>('Reward').fields({
  cost: fake(f => f.random.number({ min: 100, max: 500 })),
  createdAt: new Date().toISOString(),
  credits: fake(f => f.random.number({ min: 10, max: 100 })),
  description: fake(f => f.lorem.paragraph()),
  id: incrementingId(),
  image: fake(f => f.image.imageUrl()),
  physical: fake(f => f.random.boolean()),
  published: fake(f => f.random.boolean()),
  quantity: fake(f => f.random.number(10)),
  subtitle: fake(f => f.lorem.sentence()),
  title: fake(f => f.lorem.sentence()),
  updatedAt: new Date().toISOString(),
})

export const listRewardFactory = build<IListReward>('ListReward').fields({
  cost: fake(f => f.random.number({ min: 100, max: 500 })),
  credits: fake(f => f.random.number({ min: 10, max: 100 })),
  id: incrementingId(),
})

export const redemptionFactory = build<IRedemption>('Redemption').fields({
  addressLine2: fake(f => f.address.secondaryAddress()),
  city: fake(f => f.address.city()),
  country: fake(f => f.address.country()),
  createdAt: new Date().toISOString(),
  customerId: incrementingId(),
  email: fake(f => f.internet.email()),
  id: incrementingId(),
  inProcessing: fake(f => f.random.boolean()),
  name: [fake(f => f.name.firstName()), fake(f => f.name.lastName())].join(' '),
  phone: fake(f => f.phone.phoneNumber()),
  points: fake(f => f.random.number({ min: 100, max: 500 })),
  reward: rewardFactory(),
  rewardId: incrementingId(),
  state: fake(f => f.address.state()),
  streetAddress: fake(f => f.address.streetAddress()),
  updatedAt: new Date().toISOString(),
  zipCode: fake(f => f.address.zipCode()),
})