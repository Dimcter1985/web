import React, { createContext, useCallback, useMemo, useEffect } from 'react'
import useApp from '../hooks/useApp'
import useList from '../hooks/useList'
import createCreditCard from '../api/creditCards/createCreditCard'
import fetchCreditCards from '../api/creditCards/fetchCreditCards'
import updateCreditCard from '../api/creditCards/updateCreditCard'
import deleteCreditCard from '../api/creditCards/deleteCreditCard'

export interface ICreditCardsContextValue {
  cards: ICreditCard[]
  loadMore: () => void
  defaultCard: ICreditCard | null
  loading: boolean
  loaded: boolean
  createCard: (values: ICreditCardValues) => Promise<ICreditCard>
  makePrimary: (cardId: number) => Promise<void>
  deleteCard: (cardId: number) => Promise<void>
  delayDeleteCard: (cardId: number) => Promise<void>
  removeCardFromList: (cardId: number) => void
}

const CreditCardsContext = createContext({} as ICreditCardsContextValue)

const CreditCardsProvider: React.FC = ({ children }) => {
  const { loadMore, data: cards, set: setCards, clear, loaded, loading, start } = useList<ICreditCard>(fetchCreditCards)
  const { isLogged } = useApp()

  const defaultCard = useMemo(() => {
    if (!loaded) { return null }
    return cards.find(c => c.default) || cards[0]
  }, [loaded, cards])

  const makePrimary = useCallback(async (id: number) => {
    await updateCreditCard({ id, default: true })
    setCards(cards.map((card) => {
      if (card.default) return { ...card, default: false }
      if (card.id === id) return { ...card, default: true }
      return card
    }))
  }, [cards, setCards, updateCreditCard])

  const createCard = useCallback(
    async ({ expirationDate, ...values }: ICreditCardValues,
  ) => {
    const [expirationMonth, expirationYear] = expirationDate.split('/')
    const newCard = await createCreditCard<ICreditCard>({
      expirationMonth,
      expirationYear,
      ...values,
    })
    const savedCards = newCard.default
      ? cards.map(card => ({ ...card, default: false }))
      : cards
    setCards([...savedCards, newCard])
    return newCard
  }, [cards, setCards, createCreditCard])

  const delayDeleteCard = useCallback(async (id: number) => {
    await deleteCreditCard({ id })
  }, [deleteCreditCard])

  const removeCardFromList = useCallback((id: number) => {
    setCards(cards.filter((card) => card.id !== id))
  }, [cards, setCards])

  const deleteCard = async (id: number): Promise<void> => {
    delayDeleteCard(id)
    removeCardFromList(id)
  }

  useEffect(() => {
    if (isLogged) {
      start()
      return
    }
    clear()
  }, [isLogged])

  const value = {
    cards,
    loaded,
    loading,
    loadMore,
    makePrimary,
    createCard,
    deleteCard,
    defaultCard,
    delayDeleteCard,
    removeCardFromList,
  }

  return (
    <CreditCardsContext.Provider value={value}>
      {children}
    </CreditCardsContext.Provider>
  )
}

export { CreditCardsProvider }

export default CreditCardsContext