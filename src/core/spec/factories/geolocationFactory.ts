import { build, fake } from 'test-data-bot'

export const geolocationFactory = build<IGeolocationStatic>('Geolocation').fields({
  getCurrentPosition: () => ({
    coords: {
      latitude: fake(f => Number(f.address.latitude())),
      longitude: fake(f => Number(f.address.longitude())),
    },
    timestamp: Date.now(),
  }),
})
