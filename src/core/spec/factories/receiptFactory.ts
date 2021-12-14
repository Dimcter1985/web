import { build, fake } from 'test-data-bot'

export const receiptFactory = build<IAppointmentCostDetails>('Receipt').fields({
  subtotal: fake(f => f.random.number(200)),
  taxes: fake(f => f.random.number(10)),
  tip: fake(f => f.random.number(20)),
  serviceFee: fake(f => f.random.number(20)),
  discount: fake(f => f.random.number(20)),
  credits: fake(f => f.random.number(20)),
  total: fake(f => f.random.number(250)),
  cost: fake(f => f.random.number(200)),
  pointz: fake(f => f.random.number(50)),
  loyalty: fake(f => f.random.number(20)),
  commonDiscount: fake(f => f.random.number(20)),
})