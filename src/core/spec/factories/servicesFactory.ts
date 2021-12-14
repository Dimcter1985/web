import { build, fake, incrementingId } from 'test-data-bot'
import { categoryFactory, commonServiceFactory, salonServiceFactory } from './categoriesFactory'

export const appointmentServiceFactory = build<IAppointmentService>('AppointmentService').fields({
  id: incrementingId(),
  appointmentId: incrementingId(),
  salonServiceId: incrementingId(),
  name: fake(f => f.random.word()),
  cost: 200,
  quantity: 2,
  totalAmount: 400,
})

export const customServiceFactory = build<ICustomService>('CustomService').fields({
  id: incrementingId(),
  name: fake(f => f.random.word()),
  cost: fake(f => f.random.number(200)),
})

export const coreServicesFactory = build<ICoreServices>('CoreServices').fields({
  categories: [categoryFactory(), categoryFactory()],
  services: [commonServiceFactory(), commonServiceFactory()],
})

export const bookFormServiceFactory = build<IBookFormService>('BookFormService').fields({
  service: salonServiceFactory(),
  quantity: 1,
})
