interface IItem {
  label: string;
  value: number;
}

export const FEATURES = [
  { title: 'The perfect gift', subtitle: 'Available in digital format and choose from a variety of denominations ($25, $50, $100 etc).'},
  { title: 'Hundreds of salons', subtitle: 'Redeemable at hundreds of quality Snailz salons across Manhattan, Brooklyn and New Jersey.'},
  { title: 'No expiration date', subtitle: 'Gift cards can be used for any salon services and have no expiration date.'},
]

export const PRICES: IItem[] = [
  { label: '$25', value: 25 },
  { label: '$50', value: 50 },
  { label: '$75', value: 75 },
  { label: '$100', value: 100 },
  { label: '$150', value: 150 },
  { label: '$200', value: 200 },
]

export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  CODE_COUNTRY: 'codeCountry',
  PHONE_NUMBER: 'phoneNumber',
  CARD_AMOUNT: 'cardAmount',
  RECIPIENT_NAME: 'recipientName',
  RECIPIENT_EMAIL: 'recipientEmail',
  SEND_DATE: 'sendDate',
  MESSAGE: 'message',
}

export interface IGiftCardFormValue {
  name: string;
  email: string;
  phoneNumber: string;
  cardAmount: number;
  recipientName: string;
  recipientEmail: string;
  sendDate: Date;
  message: string;
}

export const PLACEHOLDER = '123 456 78 90'
