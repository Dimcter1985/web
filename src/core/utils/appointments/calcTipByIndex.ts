import { CASH_TIPS, MIN_TIPS_SUBTOTAL, PERCENT_TIPS } from 'core/consts'
import roundPrice from 'core/utils/roundPrice'

export default function calcTipByIndex(cost: number, index: number): number {
  if (cost > MIN_TIPS_SUBTOTAL) {
    return roundPrice(cost * PERCENT_TIPS[index] / 100)
  }
  return CASH_TIPS[index]
}