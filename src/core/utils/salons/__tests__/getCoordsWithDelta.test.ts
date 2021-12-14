import { def, get, salonListFactory } from 'core/spec'
import getCoordsWithDelta, { getLatLngDelta } from '../getCoordsWithDelta'

describe('getLatLngDelta', () => {
  it('returns latitude and longitude with default delta', () => {
    expect(getLatLngDelta()).toEqual({
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    })
  })

  it('returns latitude and longitude with custom latitude delta', () => {
    const delta = 0.5
    expect(getLatLngDelta({ delta })).toEqual({
      latitudeDelta: delta,
      longitudeDelta: delta,
    })
  })

  it('returns latitude and longitude with custom longitude delta', () => {
    const delta = 0.7
    const dimensions = { width: 200, height: 300 }
    expect(getLatLngDelta({ delta, dimensions })).toEqual({
      latitudeDelta: delta,
      longitudeDelta: 0.4666666666666666,
    })
  })
})

describe('getCoordsWithDelta', () => {
  def('salon', salonListFactory)

  it('returns latitude and longitude with delta', () => {
    expect(getCoordsWithDelta(get.salon.location)).toEqual({
      latitude: get.salon.location.lat,
      longitude: get.salon.location.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    })
  })
})