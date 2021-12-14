import { createContext, useCallback, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import noop from 'lodash/noop'
import sumBy from 'lodash/sumBy'

import useStorage from 'core/hooks/useStorage'
import { CART_KEY } from 'consts'
import useApp from 'core/hooks/useApp'
import getCustomService from 'utils/getCustomService'

import { IAddCartItem, ICart, IChangeServiceQuantity, ICartItem, ITimeSlot } from './types'
import addService from './utils/addService'
import updateServiceQuantity from './utils/updateServiceQuantity'

export interface IContext {
  inContext: boolean
  items: ICartItem[]
  timeSlot: ITimeSlot | null
  salonId: number | null
  hasItems: boolean
  totalItems: number
  totalCost: number
  completed: boolean
  ready: boolean
  isModify: boolean
  add: (value: IAddCartItem) => void
  remove: (value: number) => void
  setTimeSlot: (value: ITimeSlot) => void
  changeQuantity: (payload: IChangeServiceQuantity) => void
  clearCart: () => void
  appointment: IListAppointment | null
  setAppointment: (app: IListAppointment) => void
  modify: (salonSlug: string, appId: number) => void
  rebook: (app: IListAppointment) => void
}

const Context = createContext<IContext>({
  inContext: false,
  items: [],
  timeSlot: null,
  salonId: null,
  hasItems: false,
  completed: false,
  totalItems: 0,
  totalCost: 0,
  ready: true,
  isModify: false,
  add: noop,
  remove: noop,
  changeQuantity: noop,
  clearCart: noop,
  setTimeSlot: noop,
  appointment: null,
  setAppointment: noop,
  modify: noop,
  rebook: noop,
})

const Provider: React.FC = ({ children }) => {
  const { push } = useRouter()
  const { storage } = useStorage()
  const { isLogged } = useApp()
  
  const loadedRef = useRef(false)
  const salonId = useRef<number | null>(null)
  const [ appointment, setAppointment ] = useState<IListAppointment | null>(null)
  const [ items, setItems ] = useState<ICartItem[]>([])
  const [ ready, setReady ] = useState(false)
  const [ timeSlot, setTimeSlot ] = useState<ITimeSlot | null>(null)

  const totalItems = items.length || 0
  const totalCost = sumBy(items, (record) => record.service.cost * record.quantity)
  const hasItems = !!totalItems
  const isModify = !!appointment

  const clearCart = useCallback(() => {
    salonId.current = null
    setItems([])
    setTimeSlot(null)
    setAppointment(null)
  }, [setItems, setTimeSlot, setAppointment])

  const add = useCallback((payload: IAddCartItem) => {
    if (payload.salonId !== salonId.current) {
      salonId.current = payload.salonId
      setItems([{ service: payload.service, quantity: payload.quantity || 1 }])
    } else {
      setItems(cartItems => addService(cartItems, payload))
    }
  }, [setItems])

  const remove = useCallback((removeId: number) => {
    if (isModify && totalItems === 1) {
      return
    }
    setItems(cartItems => cartItems.filter((record) => record.service.id !== removeId))
  }, [isModify, totalItems, setItems])

  const changeQuantity = useCallback((payload: IChangeServiceQuantity) => {
    setItems(cartItems => updateServiceQuantity(cartItems, payload))
  }, [setItems])
  
  const retrieveCartFromStore = async () => {
    const data = await storage.getItem<ICart>(CART_KEY)
    salonId.current = data?.salonId || null
    setItems(data?.items || [])
    setTimeSlot(data?.timeSlot || null)
    setAppointment(data?.appointment || null)
    setReady(true)
    loadedRef.current = true
  }

  const completed = totalItems > 0 && !!salonId.current && !!timeSlot

  useEffect(() => {
    retrieveCartFromStore()
  }, [])

  useEffect(() => {
    if (!loadedRef.current) { return }

    if (!items.length && salonId.current) {
      salonId.current = null
    }
    storage.setItem(CART_KEY, { salonId: salonId.current, items, timeSlot, appointment })
  }, [items, timeSlot])

  useEffect(() => {
    if (isLogged) { return }
    clearCart()
  }, [isLogged])

  const modify = useCallback((salonSlug: string, appId: number) => {
    clearCart()
    push(`/${salonSlug}?appointment_id=${appId}`)
  }, [])

  const rebook = useCallback((app: IListAppointment) => {
    const { appointmentServices, salon } = app
    clearCart()
    appointmentServices.forEach((service) => {
      add({ salonId: salon.id, service: getCustomService(service), quantity: service.quantity })
    })
    push(`/${salon.slug}`)
  }, [clearCart, add, push])

  const value: IContext = {
    inContext: true,
    items,
    timeSlot,
    salonId: salonId.current,
    hasItems,
    totalItems,
    totalCost,
    ready,
    isModify,
    add,
    remove,
    changeQuantity,
    clearCart,
    setTimeSlot,
    completed,
    appointment,
    setAppointment,
    modify,
    rebook,
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export { Context }

export default Provider
