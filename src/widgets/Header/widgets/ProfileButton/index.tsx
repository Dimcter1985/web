import React, { useCallback } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { APPOINTMENTS_PATH, PROFILE_PATH } from 'consts/pages'
import useAuthDialog from 'hooks/useAuthDialog'
import useApp from 'core/hooks/useApp'
import useUserMenu from 'hooks/useUserMenu'

import MenuItemLink from './components/MenuItemLink'
import MenuItem from './components/MenuItem'
import NavItem from '../../components/NavItem'
import styles from './profileButton.module.scss'

const ProfileButton: React.FC = () => {
  const { user } = useApp()
  const { show } = useAuthDialog()
  const { logOut } = useApp()
  
  const { userMenuVisible, toggleUserMenu, hideUserMenu } = useUserMenu()

  const onLogoutPress = useCallback(() => {
    toggleUserMenu()
    logOut()
  }, [logOut, toggleUserMenu])

  if (user) {
    return (
      <ClickAwayListener onClickAway={hideUserMenu}>
        <Tooltip 
          arrow
          interactive
          open={userMenuVisible} 
          placement='bottom-end'
          classes={{ 
            tooltip: styles.tooltip,
            arrow: styles.arrow, 
          }}
          title={
            <>
              <MenuItemLink href={PROFILE_PATH}>Account</MenuItemLink>
              <MenuItemLink href={APPOINTMENTS_PATH}>Appointments</MenuItemLink>
              {/* <MenuItemLink href={REWARDS_PATH}>Rewards</MenuItemLink> */}
              <MenuItem onClick={onLogoutPress}>Log out</MenuItem>
            </>
          }
        >
          <NavItem
            aria-controls='user-menu'
            aria-haspopup='true'
            textClassName={styles.button}
            onClick={toggleUserMenu}
          >
            { user.firstName }
          </NavItem>
        </Tooltip>
      </ClickAwayListener>
    )
  }

  return (
    <>
      <NavItem
        aria-controls='log in'
        onClick={show}
      >
        Log in
      </NavItem>
      <NavItem
        className={styles.signUp}
        aria-controls='sign up'
        onClick={show}
      >
        Sign up
      </NavItem>
    </>
  )
}

export default ProfileButton