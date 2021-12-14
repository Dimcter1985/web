declare type ICreditCardType = 
  | 'American Express' 
  | 'MasterCard'
  | 'Visa'
  | 'Discover'

declare interface ICreditCard extends IModel {
  braintreeUid: string
  cardType: string
  createdAt: string
  default: boolean
  expiresAt: string
  id: number
  last4: string
  updatedAt: string
}

declare type IListCreditCard = Pick<ICreditCard,
  | 'cardType'
  | 'default'
  | 'expiresAt'
  | 'last4'
  | 'id'
>
