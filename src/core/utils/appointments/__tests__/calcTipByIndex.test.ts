import { MIN_TIPS_SUBTOTAL } from 'core/consts'
import calcTipByIndex from '../calcTipByIndex'

describe('calcTipByIndex', () => {
  describe('with cash tips', () => {
    const cost = MIN_TIPS_SUBTOTAL - 5

    it('returns correct value: index: 0', () => {
      expect(calcTipByIndex(cost, 0)).toEqual(3)
    })

    it('returns correct value: index: 1', () => {
      expect(calcTipByIndex(cost, 1)).toEqual(4)
    })

    it('returns correct value: index: 2', () => {
      expect(calcTipByIndex(cost, 2)).toEqual(5)
    })

    it('returns correct value: index: 3', () => {
      expect(calcTipByIndex(cost, 3)).toEqual(0)
    })
  })

  describe('with percent tips', () => {
    const cost = MIN_TIPS_SUBTOTAL + 5

    it('returns correct value: 20%', () => {
      expect(calcTipByIndex(cost, 0)).toEqual(4)
    })

    it('returns correct value: 25%', () => {
      expect(calcTipByIndex(cost, 1)).toEqual(5)
    })

    it('returns correct value: 30%', () => {
      expect(calcTipByIndex(cost, 2)).toEqual(6)
    })

    it('returns correct value: 0%', () => {
      expect(calcTipByIndex(cost, 3)).toEqual(0)
    })
  })
})
