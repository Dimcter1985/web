import { Moment } from 'moment'

export const FORM_FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  BIRTHDAY: 'birthday',
  GENDER: 'gender',
  CITY: 'city',
  STATE: 'state',
  ZIP_CODE: 'zipCode',
}

export const GENDERS = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]

export const MIN_YEARS = 14

export interface IAccountEditFormValue {
  firstName: string;
  lastName: string;
  email: string;
  birthday?: Moment;
  gender?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}
