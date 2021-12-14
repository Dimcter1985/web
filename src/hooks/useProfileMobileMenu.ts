import { useContext } from 'react'

import Header, { IContext } from 'contexts/header'

type IUseHook = Pick<IContext,
  | 'profileMobileMenuVisible'
  | 'showProfileMobileMenu'
  | 'hideProfileMobileMenu'
  | 'toggleProfileMobileMenu'
>

const useProfileMobileMenu = (): IUseHook => {
  const {
    profileMobileMenuVisible,
    showProfileMobileMenu,
    hideProfileMobileMenu,
    toggleProfileMobileMenu,
  } = useContext(Header)

  return {
    profileMobileMenuVisible,
    showProfileMobileMenu,
    hideProfileMobileMenu,
    toggleProfileMobileMenu,
  }
}

export default useProfileMobileMenu
