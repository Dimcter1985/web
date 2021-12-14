import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'

const query = `
  mutation CreatePotentialSalon($payload: CreatePotentialSalonInputs!) {
    createPotentialSalon(payload: $payload) {
      data {
        success
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

export interface IParams {
  ownerName: string;
  name: string;
  zipCode: string;
  email: string;
  phone: string;
}

const createPotentialSalon = (payload: IParams): Promise<IResult> => (
  buildMutation<IResult>({ query, ...{ payload } })
)

export default createPotentialSalon
