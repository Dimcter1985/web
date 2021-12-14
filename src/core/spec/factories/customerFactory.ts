import { build, fake, incrementingId } from 'test-data-bot'

export const customerFactory = build<ICustomer>('Customer').fields({
  id: incrementingId(),
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  birthday: new Date().toISOString(),
  mobile: fake(f => f.phone.phoneNumber()),
  avatar: fake(f => f.image.imageUrl()),
  referralCode: fake(f => f.lorem.word()),
  points: fake(f => f.random.number(500)),
  token: fake(f => f.random.uuid()),
  gender: null,
  city: null,
  state: null,
  zipCode: '111111',
  credits: 2000,
})

export const refreshCustomerFactory = build<IRefreshCustomer>('RefreshCustomer').fields({
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  birthday: new Date().toISOString(),
  avatar: fake(f => f.image.imageUrl()),
  points: fake(f => f.random.number(500)),
  gender: null,
  city: null,
  state: null,
  zipCode: '111111',
})
