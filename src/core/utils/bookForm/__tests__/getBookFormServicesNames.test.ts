import { bookFormServiceFactory, customServiceFactory, salonServiceFactory } from 'core/spec'
import getBookFormServicesNames from '../getBookFormServicesNames'

describe('getBookFormServicesNames', () => {
  const services = [
    bookFormServiceFactory({ service: salonServiceFactory({ name: 'Manicure' }) }),
    bookFormServiceFactory({ service: salonServiceFactory({ name: 'Pedicure' }) }),
    bookFormServiceFactory({ service: salonServiceFactory({ name: 'Massage' }) }),
  ]
  const customServices = [
    customServiceFactory({ name: 'Extra 1'}),
    customServiceFactory({ name: 'Extra 2'}),
  ]

  describe('Without custom services', () => {
    it('returns correct services names', () => {
      expect(getBookFormServicesNames(services, [])).toEqual('Manicure, Pedicure, Massage')
    })
  })

  describe('With custom services', () => {
    it('returns correct services names', () => {
      expect(getBookFormServicesNames(services,customServices)).toEqual('Extra 1, Extra 2, Manicure, Pedicure, Massage')
    })
  })
})