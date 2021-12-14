declare interface IUser extends IModel {
  id: number
  email: string
  firstName: string
  lastName: string
  birthday: string | null
  mobile: string
  avatar?: string
  token: string
  referralCode: string
  braintreeId: string
  braintreeToken: string
  credits: number
  points: number
  deviceType: string
  gender: string | null
  city: string | null
  state: string | null
  zipCode: string | null
}

declare type ICustomer = Pick<IUser, 
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'birthday'
  | 'mobile'
  | 'avatar'
  | 'referralCode'
  | 'points'
  | 'token'
  | 'gender'
  | 'city'
  | 'state'
  | 'zipCode'
  | 'credits'
>

declare type IRefreshCustomer = Pick<IUser, 
  | 'avatar'
  | 'birthday'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'points'
  | 'gender'
  | 'city'
  | 'state'
  | 'zipCode'
>