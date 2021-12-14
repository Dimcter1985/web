import React from 'react'

import useAuthDialog from 'hooks/useAuthDialog'
import useApp from 'core/hooks/useApp'
import useProfileMobileMenu from 'hooks/useProfileMobileMenu'

import NavItem from '../../components/NavItem'
import styles from './profileButtonMobile.module.scss'

const ProfileButtonMobile: React.FC = () => {

  const { user } = useApp()
  const { show } = useAuthDialog()
  const { showProfileMobileMenu } = useProfileMobileMenu()
  
  if (user) {
    return (
      <NavItem
        aria-controls='user-menu'
        aria-haspopup='true'
        hidden='desktop'
        textClassName={styles.button}
        onClick={showProfileMobileMenu}
      >
        { user.firstName }
      </NavItem>
    )
  }

  return (
    <NavItem
      aria-controls='log in'
      hidden='desktop'
      onClick={show}
    >
      Log in
    </NavItem>
  )
}

export default ProfileButtonMobile