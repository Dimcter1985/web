import { useContext } from 'react'

import Header, { IContext } from 'contexts/header'

type IUseHook = Pick<IContext, 'mobileMenuVisible' | 'toggleMobileMenu' | 'showMobileMenu' | 'hideMobileMenu'>

const useMobileMenu = (): IUseHook => {
  const {
    mobileMenuVisible,
    toggleMobileMenu,
    showMobileMenu,
    hideMobileMenu,
  } = useContext(Header)

  return {
    mobileMenuVisible,
    toggleMobileMenu,
    showMobileMenu,
    hideMobileMenu,
  }
}

export default useMobileMenu
