import buildQuery from 'core/utils/api/buildQuery'
import { PROMO } from 'core/consts'

const query = `
  query CalculatedDiscount($payload: FetchCalculatedOneInputs!) {
    calculatedDiscount(payload: $payload) {
      amount
      code
      id
    }
  }
`

export interface IService {
  serviceId: number
  quantity: number
}

export interface IDiscountParams {
  code: string
  services: IService[]
  salonId: number
  appointmentId?: number
}

type IQueryResult<T> = Omit<T, 'type'>

const calculatedDiscount = (payload: IDiscountParams): Promise<ICalculatedDiscount> => (
  buildQuery<IQueryResult<ICalculatedDiscount>>({ query, ...{ payload } })
    .then(data => ({ type: PROMO, ...data }))
)

export default calculatedDiscount