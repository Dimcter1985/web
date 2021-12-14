import { useCallback, useState } from 'react'

export interface IUseUserMenu {
  userMenuVisible: boolean
  hideUserMenu(): void
  toggleUserMenu(): void
}

const useUserMenu = (): IUseUserMenu => {
  const [userMenuVisible, setUserMenuVisible] = useState(false)

  const toggleUserMenu = useCallback(() => {
    setUserMenuVisible(state => !state)
  }, [])

  const hideUserMenu = useCallback(() => {
    setUserMenuVisible(false)
  }, [])

  return {
    userMenuVisible,
    hideUserMenu,
    toggleUserMenu,
  }
}

export default useUserMenu