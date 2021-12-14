import getUserImageUrl from '../getUserImageUrl'
import resource from '../../resources/user-avatar.jpg'

describe('getUserImageUrl', () => {
  it('without an image', () => {
    expect(getUserImageUrl()).toEqual(resource)
  })

  it('with an image', () => {
    global.baseUrl = 'api/'
    expect(getUserImageUrl('uri')).toEqual('api/uri')
  })
})
