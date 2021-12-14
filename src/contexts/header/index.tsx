import React, { createContext } from 'react'

import useMobileMenu, { IUseMobileMenu } from './hooks/useMobileMenu'
import useUserMenu, { IUseUserMenu } from './hooks/useUserMenu'
import useProfileMobileMenu, { IUseProfileMobileMenu } from './hooks/useProfileMobileMenu'

export type IContext = IUseMobileMenu & IUseUserMenu & IUseProfileMobileMenu

const Header = createContext({} as IContext)

const HeaderProvider: React.FC = ({ children }) => {

  const mobileMenu = useMobileMenu()
  const profileMobileMenu = useProfileMobileMenu()
  const userMenu = useUserMenu()

  const value: IContext = {
    ...mobileMenu,
    ...userMenu,
    ...profileMobileMenu,
  }

  return (
    <Header.Provider value={value}>
      {children}
    </Header.Provider>
  )
}

export { HeaderProvider }

export default Header