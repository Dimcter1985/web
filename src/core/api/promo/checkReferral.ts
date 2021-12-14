import buildQuery from 'core/utils/api/buildQuery'
import { REFERRAL } from 'core/consts'

const query = `
  query CheckReferral($filters: CheckReferralFilters!) {
    checkReferral(filters: $filters) {
      amount
    }
  }
`

export interface IReferralParams {
  appointmentId?: number
  code: string
}

type IQueryResult<T> = Omit<T, 'code' | 'type'>

const checkReferral = (payload: IReferralParams): Promise<IReferralDiscount> => (
  buildQuery<IQueryResult<ICalculatedDiscount>>({ query, ...{ filters: payload } })
    .then(data => ({ type: REFERRAL, code: payload.code, ...data }))
)

export default checkReferral