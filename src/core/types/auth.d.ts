declare interface ICodeFormValues {
  code: string
}

declare interface ISignInFormValues {
  mobile: string
}

declare interface ISignUpFormValues {
  fullName: string
  email: string
  mobile: string
  zipCode: string
  aboutUs: string
}

declare interface ISignInParams {
  mobile: string
  code: number
}

// Use inheritance to add `photos` property to the interface
declare interface ICreateReviewParams {
  overallRating: number
  promptnessRating: number
  professionalismRating: number
  cleanlinessRating: number
  comment?: string
  anonymous: boolean
}

declare interface ISignUpParams {
  firstName: string
  lastName: string
  email: string
  mobile: string
  code: number
  aboutUs?: string
  zipCode?: string
  deviceType: string
}

// Use inheritance to add `avatar` property to the interface
declare interface IUpdateProfileParams {
  firstName?: string
  lastName?: string
  birthday?: string
  gender?: string
  city?: string
  state?: string
  zipCode?: string
}