import { def, get, storage } from 'core/spec'
import Storage from '../storage'

describe('Storage', () => {
  def('env', () => ({
    ENVIRONMENT: 'staging',
    BASE_URL: 'api/',
  }))

  it('uses the correct key', () => {
    const localStorage = new Storage(storage, get.env)

    localStorage.getItem('auth')
    expect(storage.getItem).toBeCalledWith('staging.snailz.auth')

    localStorage.setItem('user', {})
    expect(storage.setItem).toBeCalledWith('staging.snailz.user', JSON.stringify({}))

    localStorage.removeItem('test')
    expect(storage.removeItem).toBeCalledWith('staging.snailz.test')
  })
})
