import React, { useCallback } from 'react'

import useAuthDialog from 'hooks/useAuthDialog'
import useApp from 'core/hooks/useApp'
import * as Pages from 'consts/pages'
import useMobileMenu from 'hooks/useMobileMenu'
import useProfileMobileMenu from 'hooks/useProfileMobileMenu'

import Menu from './components/Menu'
import MenuItem from './components/MenuItem'
import AuthActions from './components/AuthActions'

const HeaderMobileMenu: React.FC = () => {

  const { mobileMenuVisible, toggleMobileMenu } = useMobileMenu()
  const { showProfileMobileMenu } = useProfileMobileMenu()
  const { show } = useAuthDialog()
  const { isLogged, user } = useApp()

  const checkAuth = useCallback(() => {
    if (!isLogged) {
      show()
      toggleMobileMenu()
    }
    showProfileMobileMenu()
  }, [isLogged, show, toggleMobileMenu, showProfileMobileMenu])

  return (
    <Menu visible={mobileMenuVisible}>
      { user ? (
        <MenuItem 
          href={Pages.PROFILE_PATH} 
          onClick={checkAuth}
        >
          <b>{`${user.firstName}’s Account`}</b>
        </MenuItem>
      ) : (
        <AuthActions />
      )}
      <MenuItem href={Pages.SEARCH_PATH}>
        Search
      </MenuItem>
      <MenuItem href={Pages.REWARDS_PATH}>
        Rewards
      </MenuItem>
      <MenuItem href={Pages.GIFT_CARD_PATH}>
        Gift Cards
      </MenuItem>
      <MenuItem href={Pages.HOW_SNAILZ_WORKS_PATH}>
        How Snailz Works
      </MenuItem>
      <MenuItem href={Pages.FOR_SALONS_PATH}>
        For Salons
      </MenuItem>
    </Menu>
  )
}

export default HeaderMobileMenu