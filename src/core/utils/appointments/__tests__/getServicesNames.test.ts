import { customServiceFactory, serviceFactory } from 'core/spec'
import getServicesNames from '../getServicesNames'

describe('getServicesNames', () => {
  const services = [
    serviceFactory({ name: 'Manicure' }),
    serviceFactory({ name: 'Pedicure' }),
  ]
  const customServices = [
    customServiceFactory({ name: 'Extra 1' }),
  ]

  describe('Without custom services', () => {
    it('returns correct services names', () => {
      expect(getServicesNames(services)).toEqual('Manicure, Pedicure')
    })
  })

  describe('With custom services', () => {
    it('returns correct services names', () => {
      expect(getServicesNames(services, customServices)).toEqual('Manicure, Pedicure, Extra 1')
    })
  })
})
