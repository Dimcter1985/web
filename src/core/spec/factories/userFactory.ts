import { build, fake, incrementingId } from 'test-data-bot'

export const userFactory = build<IUser>('User').fields({
  id: incrementingId(),
  email: fake(f => f.internet.email()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  birthday: new Date().toISOString(),
  mobile: fake(f => f.phone.phoneNumber()),
  avatar: fake(f => f.image.imageUrl()),
  token: fake(f => f.random.uuid()),
  referralCode: fake(f => f.lorem.words()),
  braintreeId: fake(f => f.random.uuid()),
  braintreeToken: fake(f => f.random.uuid()),
  credits: 0,
  points: 0,
  deviceType: 'ios',
  gender: null,
  city: fake(f => f.address.city()),
  state: fake(f => f.address.state()),
  zipCode: fake(f => f.address.zipCode()),
})
