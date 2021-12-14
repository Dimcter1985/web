declare interface IReward extends IModel {
  cost: number
  createdAt: string
  credits: number
  description: string | null
  id: number
  image: string | null
  physical: boolean
  published: boolean
  quantity: number | null
  subtitle: string | null
  title: string
  updatedAt: string
}

declare type IListReward = Pick<IReward, 
  | 'id'
  | 'cost'
  | 'credits'
>

declare interface IRedemption extends IModel {
  addressLine2: string | null
  city: string | null
  country: string | null
  createdAt: string
  customerId: number
  email: string | null
  id: number
  inProcessing: boolean
  name: string | null
  phone: string | null
  points: number | null
  reward: IReward
  rewardId: number
  state: string | null
  streetAddress: string | null
  updatedAt: string
  zipCode: string | null
}

declare type ICreatedRedemption = Pick<IRedemption, 'id'> & {
  reward: IListReward
}