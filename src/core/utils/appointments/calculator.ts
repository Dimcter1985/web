import { sum, sumBy, min, max, isNil, isNumber } from 'lodash'
import roundPrice from 'core/utils/roundPrice'
import calcTipByIndex from './calcTipByIndex'

export interface IServicePack {
  service: IService,
  quantity: number
}

export interface ICalculatorParams {
  services: IServicePack[]
  customServices?: ICustomService[]
  discount?: number
  credits?: number
  tipIndex?: number
  taxes?: number // in percentages
  loyaltyProgram?: IAppliedLoyaltyProgram
  loyaltyDiscount?: number
  serviceFee?: number
}

export default class AppointmentCalculator {
  services: IServicePack[]

  customServices: ICustomService[]

  discount: number

  credits: number

  tipIndex?: number

  taxes?: number

  loyaltyProgram?: IAppliedLoyaltyProgram

  loyaltyDiscount?: number

  serviceFee: number

  constructor(params: ICalculatorParams) {
    this.services = params.services
    this.customServices = params.customServices || []
    this.tipIndex = params.tipIndex
    this.taxes = params.taxes || 0
    this.discount = params.discount || 0
    this.credits = params.credits || 0
    this.loyaltyProgram = params.loyaltyProgram
    this.loyaltyDiscount = params.loyaltyDiscount
    this.serviceFee = params.serviceFee || 0
  }

  cost (): number {
    return sumBy(this.customServices, 'cost') + 
      sum(this.services.map(({ service, quantity }) => service.cost * quantity))
  }

  subtotal(): number {
    return this.cost()
  }

  tipAmount(): number {
    if (isNil(this.tipIndex) || this.tipIndex === 3) return 0
    return calcTipByIndex(this.subtotal(), this.tipIndex || 0)
  }

  taxesAmount(): number {
    return this.taxes ? roundPrice(this.subtotal() * this.taxes / 100) : 0
  }

  serviceFeeAmount(): number {
    return roundPrice((
      this.subtotal() -
      this.loyaltyProgramDiscount() +
      this.taxesAmount() +
      this.tipAmount()
    ) * this.serviceFee / 100)
  }

  costAfterDiscounts(): number {
    return max([
      this.subtotal() -
      this.promocodeDiscount() -
      this.loyaltyProgramDiscount(),
    0]) || 0
  }

  creditsDiscount(): number {
    return min([this.credits, this.costAfterDiscounts()]) || 0
  }

  promocodeDiscount(): number {
    return this.discount
  }

  loyaltyProgramDiscount(): number {
    if (isNumber(this.loyaltyDiscount)) return this.loyaltyDiscount
    if (!this.loyaltyProgram) return 0
    const { kind, salonServiceIds } = this.loyaltyProgram
    const discountedServices = salonServiceIds.length
      ? this.services.filter(({ service }) => salonServiceIds.includes(service.id))
      : this.services
    if (!discountedServices.length) return 0
    if (kind === 'cost') {
      return min([this.subtotal(), this.loyaltyProgram.value]) || 0
    }
    return roundPrice(sumBy(this.services, (service) => this.getServiceDiscount(service)))
  }

  getServiceDiscount({ service, quantity }: IServicePack): number {
    if (!this.loyaltyProgram) return 0
    const { kind, value, salonServiceIds } = this.loyaltyProgram
    if (salonServiceIds.length && !salonServiceIds.includes(service.id)) return 0
    switch (kind) {
      case 'percent':
        return service.cost * quantity * value / 100
      case 'free_service':
        return service.cost * quantity
      default:
        return 0
    }
  }

  totalDiscount(): number {
    return min([
      this.creditsDiscount() + this.promocodeDiscount() + this.loyaltyProgramDiscount(),
      this.subtotal(),
    ]) || 0
  }

  pointz(): number {
    return this.subtotal() - this.totalDiscount()
  }

  totalCost(): number {
    return roundPrice(
      this.subtotal() +
      this.taxesAmount() +
      this.serviceFeeAmount() +
      this.tipAmount() -
      this.totalDiscount(),
    ) 
  }

  finalCost(): number {
    return this.subtotal() - this.totalDiscount()
  }

  static calculate (params: ICalculatorParams): IAppointmentCostDetails {
    const calculator = new AppointmentCalculator(params)
    return {
      subtotal: calculator.subtotal(),
      taxes: calculator.taxesAmount(),
      tip: calculator.tipAmount(),
      serviceFee: calculator.serviceFeeAmount(),
      discount: min([calculator.subtotal(), calculator.promocodeDiscount()]) || 0,
      credits: calculator.creditsDiscount(),
      total: calculator.totalCost(),
      cost: calculator.finalCost(),
      pointz: calculator.pointz(),
      loyalty: calculator.loyaltyProgramDiscount(),
      commonDiscount: min([
        calculator.subtotal(),
        calculator.loyaltyProgramDiscount() + calculator.promocodeDiscount(),
      ]) || 0,
    }
  }
}
