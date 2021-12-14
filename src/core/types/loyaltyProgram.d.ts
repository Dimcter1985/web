declare interface ILoyaltyProgram extends IModel {
  id: number
  visits: number
  kind: string
  value: number
  salonServices: ISalonService[]
  salonServiceIds: number[]
  description: string
  photo: INullableImage
  salon: ISalon
  salonId: number
  salonName: string
  enabled: boolean
}

declare interface ILoyaltyCard extends IModel {
  id: number
  customerId: number
  loyaltyProgramId: number
  visits: number
  score: number
  loyaltyProgram: ILoyaltyProgram
}

declare type ILoyaltyProgramPreview = {
  salon: IListSalon
  salonServices: ICustomService[]
} & Pick<ILoyaltyProgram,
  | 'id'
  | 'description'
  | 'kind'
  | 'photo'
  | 'value'
  | 'visits'
>

declare type IAppliedLoyaltyProgram = Pick<ILoyaltyProgram,
  | 'salonServiceIds'
  | 'value'
  | 'kind'
>

declare type ILoyaltyPreviewCard = Pick<ILoyaltyCard, 'id'> & {
  loyaltyProgram: ILoyaltyProgramPreview
}