declare interface ISalon {
  activeLoyaltyProgram: ILoyaltyProgram | null
  address: string
  addressLine2: string | null
  averageRating: number | null
  city: string
  cleanlinessRating: number | null
  commision: number
  disabled: boolean
  description: string | null
  email: string
  featured: number
  id: number
  image: INullableImage
  location: ILocation
  managerName: string | null
  minTimeOffset: number
  mobile: string
  name: string
  neighborhoods: INeighborhood[]
  notes: string | null
  nonSnailz: boolean
  notificationNumber: string[]
  overallRating: number | null
  ownerName: string | null
  phone: string | null
  photos: IPhoto[]
  priceRange: string | null
  processingFee: boolean
  professionalismRating: number | null
  promptnessRating: number | null
  reviews: IReview[]
  reviewsCount: number
  salonCategories: ISalonCategory[]
  seoTitle: string | null
  seoDescription: string | null
  slug: string
  speciality: string | null
  state: string
  tax: number
  timezone: string
  tipping: boolean
  workHours: IWorkHours
  zipCode: string
}

declare type ISearchSalonItem = Pick<ISalon, 'id' | 'name' | 'location'>

declare type FeeType = 'cash' | 'percent'

declare interface ISalonSettings {
  appointmentServicesLimit: number
  cancelationFee: number
  cancelationFeePeriod: number
  cancelationFeeType: FeeType
  getPaidVisibleFrom: number
  noShowFee: number
  noShowFeeType: FeeType
  noShowVisibleFrom: number
  pointsByReview: number
  processingFixed: number
  processingRelative: number
}

declare type IListSalon = Pick<ISalon,
  | 'id'
  | 'address'
  | 'addressLine2'
  | 'state'
  | 'zipCode'
  | 'name'
  | 'image'
  | 'city'
  | 'location'
  | 'reviewsCount'
  | 'averageRating'
  | 'tipping'
  | 'tax'
  | 'slug'
  | 'overallRating'
  | 'timezone'
  | 'nonSnailz'
> & {
  activeLoyaltyProgram?: Pick<ILoyaltyProgram, 'id'>
}
