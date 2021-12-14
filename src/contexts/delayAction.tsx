import React, { createContext, useCallback, useState, useEffect } from 'react'
import noop from 'lodash/noop'
import { IAddCartItem } from 'contexts/cart/types'
import useApp from 'core/hooks/useApp'
import useCart from 'hooks/useCart'

interface IAddToCartAction {
  type: 'ADD_TO_CART'
  payload: IAddCartItem
}

type IDelayAction = IAddToCartAction

export interface IContext {
  addAction: (newAction: IDelayAction) => void
  clearAction: () => void
}

export const Context = createContext<IContext>({
  addAction: noop,
  clearAction: noop,
} as IContext)

const Provider: React.FC = ({ children }) => {

  const [action, setAction] = useState<IDelayAction | null>(null)

  const { isLogged } = useApp()
  const { add: addToCart } = useCart()

  const clearAction = useCallback(() => setAction(null) , [setAction])

  const executeAction = useCallback(() => {
    if (!action) { return }
    switch (action.type) {
      case 'ADD_TO_CART': 
        addToCart(action.payload)
        clearAction()
        break
      default:
    }
  }, [action, clearAction, addToCart])

  const value = {
    addAction: setAction,
    clearAction,
  }

  useEffect(() => {
    if (!isLogged) { return }
    executeAction()
  }, [isLogged, executeAction])

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default Provider
