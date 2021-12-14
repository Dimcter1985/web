import getSalonImageUrl from '../getSalonImageUrl'
import SalonFallback from '../../resources/salon.jpg'

describe('getSalonImageUrl', () => {
  it('without an image', () => {
    expect(getSalonImageUrl()).toEqual(SalonFallback)
  })

  it('with an image', () => {
    global.baseUrl = 'api/'
    expect(getSalonImageUrl({ url: 'uri' })).toEqual('api/uri')
  })
})
