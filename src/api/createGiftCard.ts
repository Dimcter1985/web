import { ERROR_QUERY_FIELDS } from 'core/api/consts/common'
import buildMutation from 'core/utils/api/buildMutation'
import { GIFT_CARD_QUERY_FIELDS } from './consts/giftCard'

const query = `
  mutation CreateGiftCard($payload: CreateGiftCardInputs!) {
    createGiftCard(payload: $payload) {
      data {
        ${GIFT_CARD_QUERY_FIELDS}
      }
      errors {
        ${ERROR_QUERY_FIELDS}
      }
    }
  }
`

interface IParams {
  name: string;
  email: string;
  phoneNumber: string;
  cardAmount: number;
  recipientName: string;
  recipientEmail: string;
  sendDate: Date;
  message: string;
  cardFingerprintId: number;
}

const createGiftCard = (payload: IParams): Promise<any> => (
  buildMutation(({ query, ...{ payload }}))
)

export default createGiftCard
