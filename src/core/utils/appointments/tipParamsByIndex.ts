
import isNil from 'lodash/isNil'
import { PERCENT_TIPS, CASH_TIPS } from '../../consts'

export type ITipParams = { tipAmount: number } | { tipPercent: number }

export default function tipParamsByIndex(cost: number, index: number | null): ITipParams {
  if (isNil(index) || (index === 3)) {
    return { tipAmount: 0 }
  }

  if (PERCENT_TIPS[0] * cost / 100 <= CASH_TIPS[0]) {
    return { tipAmount: CASH_TIPS[index] }
  }

  return { tipPercent: PERCENT_TIPS[index] }
}