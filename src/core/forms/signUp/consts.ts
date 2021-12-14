interface IItem {
  label: string
  value: string
}

export const FORM_FIELDS = {
  FULL_NAME: 'fullName',
  EMAIL: 'email',
  MOBILE: 'mobile',
  ZIP_CODE: 'zipCode',
  ABOUT_US: 'aboutUs',
}

export const ABOUT_US_SELECT_ITEMS: IItem[] = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Google Search', value: 'google' },
  { label: 'Friend', value: 'friend' },
  { label: 'Salon Website', value: 'website' },
  { label: 'At Salon', value: 'at_salon' },
  { label: 'Other', value: 'other' },
]