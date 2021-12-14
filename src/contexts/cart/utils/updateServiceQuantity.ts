import { ICartItem, IChangeServiceQuantity } from '../types'

const updateServiceQuantity = (items: ICartItem[], payload: IChangeServiceQuantity): ICartItem[] => {

  const updatedServices = items.map((record) => {
    if (record.service.id === payload.serviceId)
      {return {
        ...record,
        quantity: payload.quantity,
      }}
    return record
  })

  return updatedServices
}

export default updateServiceQuantity
