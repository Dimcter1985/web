import { build, fake, incrementingId } from 'test-data-bot'
import { imageFactory } from './common'

export const serviceFactory = build<IService>('Service').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  cost: fake(f => f.random.number(200)),
})

export const servicePackFactory = build<IServicePack>('Service').fields({
  service: serviceFactory(),
  quantity: fake(f => f.random.number({ min: 1, max: 10 })),
})

export const commonServiceFactory = build<ICommonService>('CommonService').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  position: incrementingId(),
  inFavorites: fake(f => f.random.boolean()),
})

export const salonServiceFactory = build<ISalonService>('SalonService').fields({
  id: incrementingId(),
  name: fake(f => f.random.word()),
  cost: fake(f => f.random.number(200)),
  duration: fake(f => f.random.number(60)),
  salonId: incrementingId(),
  categoryId: incrementingId(),
  description: fake(f => f.random.word()),
})

export const freeSlotSalonServiceFactory = build<IFreeSlotSalonService>('FreeSlotSalonService').fields({
  id: incrementingId(),
  name: fake(f => f.random.word()),
  cost: fake(f => f.random.number(200)),
  services: [],
})

export const serviceCategoryFactory = build<IServiceCategory>('ServiceCategory').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  position: incrementingId(),
  services: [commonServiceFactory()],
})

export const salonCategoryFactory = build<ISalonCategory>('SalonCategory').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  position: incrementingId(),
  salonServices: [salonServiceFactory()],
})

export const categoryFactory = build<ICategory>('Category').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  position: incrementingId(),
  services: [commonServiceFactory(), commonServiceFactory()],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const listCoreCategory = build<IListCategory>('ListCategory').fields({
  id: incrementingId(),
  name: fake(f => f.lorem.words()),
  image: imageFactory(),
  position: incrementingId(),
  services: [commonServiceFactory()],
})