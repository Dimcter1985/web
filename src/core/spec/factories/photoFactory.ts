import { build, fake, incrementingId } from 'test-data-bot'
import { imageFactory } from './common'

export const photoFactory = build<IPhoto>('Photo').fields({
  id: incrementingId(),
  image: imageFactory(),
  imageableId: incrementingId(),
  imageableType: fake(f => f.lorem.word()),
  position: fake(f => f.random.number(20)),
  main: fake(f => f.random.boolean()),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const uploadImageFactory = build<IUploadFile>('UploadFile').fields({
  uri: fake(f => f.image.dataUri()),
  type: 'image/jpeg',
  name: fake(f => f.random.uuid()),
})