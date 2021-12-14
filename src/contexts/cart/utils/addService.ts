import { ICartItem, IAddCartItem } from '../types'

const addService = (items: ICartItem[], newService: IAddCartItem): ICartItem[] => {

  const isExistService = items.find((rec) => rec.service.id === newService.service.id)

  const updatedServices = isExistService
    ? items.map((record) => {
      if (record.service.id === newService.service.id)
        {return {
          ...record,
          quantity: record.quantity + 1,
        }}
      return record
    }) : [...items, { service: newService.service, quantity: newService.quantity || 1 }]

  return updatedServices
}

export default addService
