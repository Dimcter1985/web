import React, { createContext, useState, useCallback, useEffect } from 'react'
import fetchProfile from 'core/api/auth/fetchProfile'

import useStorage from '../hooks/useStorage'

interface IProps {
  initUser?: ICustomer
}

const App = createContext({} as IAppContext)

export const AUTH_STORAGE_KEY = 'auth'

const AppProvider: React.FC<IProps> = ({ initUser = null, children }) => {

  const [ user, setUser ] = useState<ICustomer | null>(initUser)
  const [ ready, setReady ] = useState(false)

  const { storage } = useStorage()

  const setToken = useCallback((token: string | null) => {
    global.token = token
  }, [global])

  const retrieveUserFromStore = async (): Promise<void> => {
    const data = await storage.getItem<ICustomer>(AUTH_STORAGE_KEY)
    setToken(data ? data.token : null)
    setUser(data)
    setReady(true)
  }

  useEffect(() => { retrieveUserFromStore() }, [])

  const userId = user ? user.id : null
  const isLogged = !!user

  const updateUser = useCallback(async (data: IRefreshCustomer) => {
    try {
      if (!user) return
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      await storage.setItem(AUTH_STORAGE_KEY, updatedUser)
    } catch (error) {
      return null
    }
  }, [user, storage])

  const refreshUser = useCallback(async () => {
    try {
      const refreshedUser = await fetchProfile()
      updateUser(refreshedUser)
    } catch (error) {
      return null
    }
  }, [updateUser])

  const logIn = useCallback(async (data: ICustomer) => {
    try {
      setUser(data)
      setToken(data.token)
      await storage.setItem(AUTH_STORAGE_KEY, data)
    } catch (error) {
      return null
    }
  }, [storage])

  const logOut = useCallback(async () => {
    try {
      setUser(null)
      setToken(null)
      await storage.removeItem(AUTH_STORAGE_KEY)
    } catch (error) {
      return null
    }
  }, [storage])

  if (user) { global.token = user.token }

  return (
    <App.Provider 
      value={{
        isLogged,
        logIn,
        logOut,
        updateUser,
        refreshUser,
        user,
        userId,
        ready,
      }}
    >
      {children}
    </App.Provider>
  )
}

export { AppProvider }

export default App