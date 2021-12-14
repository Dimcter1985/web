import { MIN_TIPS_SUBTOTAL } from 'core/consts'

const getTipIndex = (cost: number, tip: number) => {
  if (tip === 0) { return 3 }
  if (cost <= MIN_TIPS_SUBTOTAL) {
    return tip - 3
  }
  switch(Math.round(tip * 100 / cost)) {
    case 20: return 0
    case 25: return 1
    case 30: return 2
    default: return null
  }
}

export default getTipIndex
