import { def, get, salonListFactory } from 'core/spec'
import getCoords from '../getCoords'

describe('getCoords', () => {
  def('salon', salonListFactory)

  it('returns latitude and longitude', () => {
    expect(getCoords(get.salon.location)).toEqual({
      latitude: get.salon.location.lat,
      longitude: get.salon.location.lng,
    })
  })
})
