import React, { useCallback } from 'react'
import HamburgerMenu from 'react-hamburger-menu'

import { black } from 'core/theme/colors'
import useMobileMenu from 'hooks/useMobileMenu'
import PureButton from 'components/PureButton'

import useProfileMobileMenu from 'hooks/useProfileMobileMenu'
import styles from './styles.module.scss'

const HeaderMenuButton: React.FC = () => {

  const { mobileMenuVisible, showMobileMenu, hideMobileMenu } = useMobileMenu()
  const { profileMobileMenuVisible, hideProfileMobileMenu } = useProfileMobileMenu()

  const isOpen = mobileMenuVisible || profileMobileMenuVisible

  const menuClicked = useCallback(() => {
    if (isOpen) {
      hideProfileMobileMenu()
      hideMobileMenu()
    } else {
      showMobileMenu()
    }
  }, [isOpen, showMobileMenu, hideMobileMenu, hideProfileMobileMenu])

  return (
    <PureButton 
      className={styles.menuButton}
      onClick={menuClicked}
    >
      <HamburgerMenu
        isOpen={isOpen}
        color={black}
        width={16}
        height={12}
        strokeWidth={2}
        menuClicked={() => {}}
        data-testid='mobileMenuButton'
      />
    </PureButton>
  )
}

export default HeaderMenuButton