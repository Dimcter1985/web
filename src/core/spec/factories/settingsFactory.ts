import { build, fake } from 'test-data-bot'

export const globalSettingsFactory = build<IGlobalSettings>('GlobalSettings').fields({
  referralDiscount: fake(f => f.random.number(10)),
  serviceFee: fake(f => f.random.number(10)),
})