import { Moment } from 'moment'

export type IValidFormValues = Pick<ICreditCardValues, 'number' | 'cvv' | 'postalCode' | 'cardholderName' | 'default'> & {
  expirationDate: Moment
}
