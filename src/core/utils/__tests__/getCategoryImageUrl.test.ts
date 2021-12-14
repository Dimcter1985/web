import getCategoryImageUrl from '../getCategoryImageUrl'
import Category from '../resources/category.png'

describe('getCategoryImageUrl', () => {
  it('without an image', () => {
    expect(getCategoryImageUrl()).toEqual(Category)
  })

  it('with an image', () => {
    global.baseUrl = 'api/'
    expect(getCategoryImageUrl({ url: 'uri' })).toEqual('api/uri')
  })
})
