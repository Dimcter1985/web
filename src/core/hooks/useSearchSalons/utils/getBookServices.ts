import intersectionWith from 'lodash/intersectionWith'

export default function getBookServices(
  salonServices: IFreeSlotSalonService[],
  selectedServices?: IBookFormService[],
): IBookFormService<IService>[] {
  return salonServices.map(({ services: coreServices, ...service }) => {
    const foundedServices = intersectionWith(selectedServices || [], coreServices, (serviceItem, coreServiceItem) => (
      serviceItem.service.id === coreServiceItem.id
    ))
    const quantity = (foundedServices[0] || {}).quantity || 1
    return { service, quantity }
  })
}