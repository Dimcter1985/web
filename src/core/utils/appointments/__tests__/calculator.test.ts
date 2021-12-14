import { buildMany, discountFactory, loyaltyProgramFactory, salonServiceFactory, servicePackFactory, serviceFactory } from 'core/spec'
import Calculator from  '../calculator'

const services = buildMany(servicePackFactory, 2, { service: serviceFactory({ cost: 20 }), quantity: 3 })

describe('AppointmentCalculator', () => {
  describe('subtotal', () => {
    it('calculates subtotal', () => {
      const calculator = new Calculator({ services })
      expect(calculator.subtotal()).toEqual(120)
    })
  })

  describe('tips', () => {
    it('calculates tips amount', () => {
      const calculator = new Calculator({ services, tipIndex: 0 })
      expect(calculator.tipAmount()).toEqual(24)
    })
  })

  describe('service fee', () => {
    it('calculates service amount', () => {
      const calculator = new Calculator({ services, serviceFee: 10 })
      expect(calculator.serviceFeeAmount()).toEqual(12)
    })

    it('returns zero', () => {
      const calculator = new Calculator({ services })
      expect(calculator.taxesAmount()).toEqual(0)
    })
  })

  describe('taxes', () => {
    it('calculates taxes amount', () => {
      const calculator = new Calculator({ services, taxes: 5 })
      expect(calculator.taxesAmount()).toEqual(calculator.subtotal() * 0.05)
    })
  })

  describe('Referal', () => {
    const { amount: discount } = discountFactory({ amount: 10 })
    it('calculates promocodeDiscount for referal discount', () => {
      const calculator = new Calculator({ services, discount })
      expect(calculator.promocodeDiscount()).toEqual(10)
    })
  })

  describe('Discount', () => {
    describe('Absolute value', () => {
      const { amount: discount } = discountFactory({ type: 'cash' })

      it('calculates promocodeDiscount for absolute discount', () => {
        const calculator = new Calculator({ services, discount })
        expect(calculator.promocodeDiscount()).toEqual(discount)
      })
    })

    describe('Loyalty discount', () => {
      it('calculates totalDiscount with loyalty discount', () => {
        const calculator = new Calculator({ services, loyaltyDiscount: 10 })
        expect(calculator.totalDiscount()).toEqual(10)
      })
    })

    describe('Loyalty program', () => {
      const salonService = salonServiceFactory({ id: 2 })

      def('services', () => [
        servicePackFactory({ service: serviceFactory({ id: 1, cost: 10 }), quantity: 1 }),
        servicePackFactory({ service: serviceFactory({ id: 2, cost: 20 }), quantity: 1 }),
      ])

      def('loyaltyProgram', () => loyaltyProgramFactory({
        salonServiceIds: [salonService.id],
        salonServices: [salonService],
        kind: get.kind,
        value: 12,
      }))

      describe('Kind - cost', () => {
        def('kind', () => 'cost')

        it('calculates totalDiscount with loyalty program', () => {
          const calculator = new Calculator({
            services: get.services,
            loyaltyProgram: get.loyaltyProgram,
          })
          expect(calculator.totalDiscount()).toEqual(12)
        })
      })

      describe('Kind - percent', () => {
        def('kind', () => 'percent')

        it('calculates totalDiscount with loyalty program', () => {
          const calculator = new Calculator({
            services: get.services,
            loyaltyProgram: get.loyaltyProgram,
          })
          expect(calculator.totalDiscount()).toEqual(2.4)
        })
      })

      describe('Kind - free_service', () => {
        def('kind', () => 'free_service')

        it('calculates totalDiscount with loyalty program', () => {
          const calculator = new Calculator({
            services: get.services,
            loyaltyProgram: get.loyaltyProgram,
          })
          expect(calculator.totalDiscount()).toEqual(20)
        })
      })

      describe('Kind - another', () => {
        def('kind', () => 'another')

        it('calculates totalDiscount with loyalty program', () => {
          const calculator = new Calculator({
            services: get.services,
            loyaltyProgram: get.loyaltyProgram,
          })
          expect(calculator.totalDiscount()).toEqual(0)
        })
      })
    })
  })

  describe('TotalCost', () => {
    const { amount: discount } = discountFactory({ amount: 10 })

    it ('returns total cost', () => {
      const calculator = new Calculator({ services, tipIndex: 1, taxes: 5, discount })
      expect(calculator.totalCost()).toEqual(
        calculator.subtotal()
        + calculator.tipAmount()
        + calculator.taxesAmount()
        - calculator.promocodeDiscount() 
      )
    })
  })
})