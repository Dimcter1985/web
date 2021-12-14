import { build, fake, incrementingId } from 'test-data-bot'
import { sample } from 'lodash'

export const creditCardFactory = build<IListCreditCard>('CreditCard').fields({
  cardType: sample(['amex', 'visa', 'mastercard']) || 'discover',
  default: fake(f => f.random.boolean()),
  expiresAt: new Date().toISOString(),
  last4: fake(f => f.random.number({ min: 1000, max: 9999 })),
  id: incrementingId(),
})