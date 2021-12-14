import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { def, get, waitFor, creditCardFactory } from 'core/spec'
import createCreditCard from 'core/api/creditCards/createCreditCard'
import fetchCreditCards from 'core/api/creditCards/fetchCreditCards'
import deleteCreditCard from 'core/api/creditCards/deleteCreditCard'
import updateCreditCard from 'core/api/creditCards/updateCreditCard'

import useCreditCards from '../useCreditCards'
import { CreditCardsProvider } from '../../contexts/CreditCards'

jest.mock('core/api/creditCards/createCreditCard', () => jest.fn())
jest.mock('core/api/creditCards/fetchCreditCards', () => jest.fn())
jest.mock('core/api/creditCards/deleteCreditCard', () => jest.fn())
jest.mock('core/api/creditCards/updateCreditCard', () => jest.fn())
jest.mock('hooks/useApp', () => () => ({ isLogged: true }))

afterAll(jest.clearAllMocks)

const wrapper = ({ children }: any) => <CreditCardsProvider>{children}</CreditCardsProvider>

describe('useCreditCards', () => {
  def('subject', () => renderHook(() => useCreditCards(), { wrapper }))

  def('cards', () => [
    creditCardFactory({ id: 1, default: true }),
    creditCardFactory({ id: 2, default: false }),
    creditCardFactory({ id: 3, default: false }),
  ])

  beforeEach(() => {
    // @ts-ignore
    fetchCreditCards.mockResolvedValue({
      data: get.cards,
      total: get.cards.length,
    })
  })

  it('has correct initial state', async () => {
    const { result } = get.subject

    await act(async () => {
      await waitFor(() => {
        expect(result.current.cards).toEqual(get.cards)
        expect(typeof result.current.loadMore).toEqual('function')
        expect(typeof result.current.makePrimary).toEqual('function')
        expect(typeof result.current.createCard).toEqual('function')
        expect(typeof result.current.deleteCard).toEqual('function')
      })
    })
  })

  it('marks a credit card as default', async () => {
    const { result } = get.subject
    const cardId = 2

    await waitFor(async () => {
      await act(async () => {
        await result.current.makePrimary(cardId)
      })
      expect(updateCreditCard).toBeCalledWith({
        id: cardId,
        default: true,
      })
      expect(result.current.cards[0].default).toEqual(false)
      expect(result.current.cards[1].default).toEqual(true)
      expect(result.current.defaultCard).toEqual(result.current.cards[1])
    })
  })

  it('deletes credit card', async () => {
    const { result } = get.subject
    const cardId = 2

    await waitFor(async () => {
      await act(async () => {
        await result.current.deleteCard(cardId)
      })
      expect(deleteCreditCard).toBeCalledWith({ id: cardId })
      expect(result.current.cards.length).toEqual(2)
      expect(result.current.cards.find((c: IListCreditCard) => c.id === cardId)).toEqual(undefined)
      expect(result.current.defaultCard).toEqual(result.current.cards[0])
    })
  })

  describe('New card', () => {
    beforeEach(() => {
      // @ts-ignore
      createCreditCard.mockResolvedValue(createCreditCard)
    })

    it('creates credit card', async () => {
      const { result } = get.subject
      const values = {
        cardholderName: 'John Smith',
        number: '4111111111111111',
        cvv: '123',
        postalCode: '12345',
        default: true,
      }

      await act(async () => {
        await waitFor(async () => {

          expect(result.current.cards.length).toEqual(3)

          await act(async () => {
            await result.current.createCard({
              expirationDate: '12/50',
              ...values,
            })
            expect(createCreditCard).toBeCalledWith({
              expirationMonth: '12',
              expirationYear: '50',
              ...values,
            })
          })
        })
      })

      await act(async () => {
        await waitFor(() => {
          const { defaultCard, cards } = result.current
          expect(cards.length).toEqual(4)
          expect(defaultCard).toEqual(cards[0])
        })
      })
    })
  })
})
