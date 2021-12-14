import { build, fake, incrementingId } from 'test-data-bot'
import moment from 'moment'
import { PROMO, REFERRAL } from 'core/consts'

export const discountFactory = build<IDiscount>('Discount').fields({
  id: incrementingId(),
  code: fake(f => f.lorem.word()),
  disabled: fake(f => f.random.boolean()),
  amount: fake(f => f.random.number(20)),
  type: fake(f => f.random.word()),
  startsAt: moment().toDate(),
  endsAt: moment().add(1, 'day').toDate(),
  onlyForNewClients: fake(f => f.random.boolean()),
  minimumSpend: fake(f => f.random.number(10)),
  serviceIds: [fake(f => f.random.number())],
})

export const calculatedDiscountFactory = build<ICalculatedDiscount>('CalculatedDiscount').fields({
  amount: fake(f => f.random.number(20)),
  code: fake(f => f.lorem.word()),
  id: incrementingId(),
  type: PROMO,
})

export const referralDiscountFactory = build<IReferralDiscount>('ReferralDiscount').fields({
  amount: fake(f => f.random.number(20)),
  code: 'RFJOE5214SZ',
  type: REFERRAL,
})