import { useContext } from 'react'
import CreditCardsContext, { ICreditCardsContextValue } from '../contexts/CreditCards'

const useCreditCards = (): ICreditCardsContextValue => (
  useContext(CreditCardsContext)
)

export default useCreditCards