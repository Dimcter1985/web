import omit from 'lodash/omit'
import { bookFormServiceFactory, freeSlotSalonServiceFactory, salonServiceFactory } from 'core/spec'
import getBookServices from '../getBookServices'

describe('getBookServices', () => {
  it('returns correct services', () => {
    const salonService1 = freeSlotSalonServiceFactory({ services: [{ id: 1 }]})
    const salonService2 = freeSlotSalonServiceFactory({ services: [{ id: 2 }]})
    const salonService3 = freeSlotSalonServiceFactory({ services: [{ id: 3 }]})

    const selectedService1 = bookFormServiceFactory({
      service: salonServiceFactory({ id: 1 }),
      quantity: 5,
    })
    const selectedService2 = bookFormServiceFactory({
      service: salonServiceFactory({ id: 2 }),
      quantity: 3,
    })
    const selectedService3 = bookFormServiceFactory({
      service: salonServiceFactory({ id: 4 }),
      quantity: 2,
    })

    const salonServices = [salonService1, salonService2, salonService3]
    const selectedServices = [selectedService1, selectedService2, selectedService3]

    expect(getBookServices(salonServices, selectedServices)).toEqual([
      { service: omit(salonService1, 'services'), quantity: 5 },
      { service: omit(salonService2, 'services'), quantity: 3 },
      { service: omit(salonService3, 'services'), quantity: 1 },
    ])
  })
})
