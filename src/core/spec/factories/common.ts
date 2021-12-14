import { build, BuilderFunction, fake } from 'test-data-bot'
import { times } from 'lodash'

export const imageFactory = build<IImage>('Image').fields({
  url: fake(f => f.image.avatar()),
  thumbUrl: fake(f => f.image.avatar()),
})

export const locationFactory = build<ILocation>('Location').fields({
  lat: fake(f => Number(f.address.latitude())),
  lng: fake(f => Number(f.address.longitude())),
})

export function buildMany<T>(factory: BuilderFunction<T>, count: number, params?: Partial<T>): T[] {
  return times(count, () => factory(params || {}))
}