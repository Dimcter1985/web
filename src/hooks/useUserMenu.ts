import { useContext } from 'react'

import Header, { IContext } from 'contexts/header'

type IUseHook = Pick<IContext, 'toggleUserMenu' | 'hideUserMenu' | 'userMenuVisible'>

const useUserMenu = (): IUseHook => {
  const {
    userMenuVisible,
    hideUserMenu,
    toggleUserMenu,
  } = useContext(Header)

  return {
    userMenuVisible,
    hideUserMenu,
    toggleUserMenu,
  }
}

export default useUserMenu
