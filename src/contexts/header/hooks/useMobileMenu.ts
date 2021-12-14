import { useCallback, useState } from 'react'

export interface IUseMobileMenu {
  mobileMenuVisible: boolean
  toggleMobileMenu(): void
  showMobileMenu(): void
  hideMobileMenu(): void
}

const useMobileMenu = (): IUseMobileMenu => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuVisible(state => !state)
  }, [setMobileMenuVisible])

  const showMobileMenu = useCallback(() => {
    setMobileMenuVisible(true)
  }, [setMobileMenuVisible])

  const hideMobileMenu = useCallback(() => {
    setMobileMenuVisible(false)
  }, [setMobileMenuVisible])

  return {
    mobileMenuVisible,
    toggleMobileMenu,
    showMobileMenu,
    hideMobileMenu,
  }
}

export default useMobileMenu