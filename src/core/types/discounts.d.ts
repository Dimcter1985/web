declare interface IDiscount extends IModel {
  id: number
  code: string
  disabled: boolean
  amount: number
  type: string
  startsAt: Date | null
  endsAt: Date | null
  onlyForNewClients: boolean
  minimumSpend: number
  serviceIds: Array<number>
}
