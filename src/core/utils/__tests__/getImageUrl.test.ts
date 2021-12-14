import getImageUrl from '../getImageUrl'

describe('getImageUrl', () => {
  it('returns correct url', () => {
    global.baseUrl = 'api/'
    expect(getImageUrl('uri')).toEqual('api/uri')
  })
})
