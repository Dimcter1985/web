import { customServiceFactory } from 'core/spec'
import convertCustomServices from '../convertCustomServices'

describe('convertCustomServices', () => {
  it('returns correct value', () => {
    const service1 = customServiceFactory()
    const service2 = customServiceFactory()
    const services = [service1, service2]
    expect(convertCustomServices(services)).toEqual([
      { service: service1, quantity: 1, },
      { service: service2, quantity: 1, },
    ])
  })
})
