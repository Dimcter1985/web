import React from 'react'
import useApp from 'core/hooks/useApp'
import * as Pages from 'consts/pages'
import useProfileMobileMenu from 'hooks/useProfileMobileMenu'

import Menu from './components/Menu'
import MenuItem from './components/MenuItem'
import Caption from './components/Caption'
import Separator from './components/Separator'
import ContentGroup from './components/ContentGroup'
import GroupCaption from './components/GroupCaption'

const ProfileMobileMenu: React.FC = () => {

  const { user, logOut } = useApp()
  const { profileMobileMenuVisible } = useProfileMobileMenu()

  if (!user) { return null }

  return (
    <Menu visible={profileMobileMenuVisible}>
      <ContentGroup>
        <Caption>
          { `Hi ${user.firstName}` }
        </Caption>
        <Separator />
        <GroupCaption>
          Account
        </GroupCaption>
        <MenuItem href={Pages.PROFILE_PATH}>
          Profile
        </MenuItem>
        <MenuItem href={Pages.PAYMENT_METHODS_PATH}>
          Payment methods
        </MenuItem>
        <Separator />
        <GroupCaption>
          Appointments
        </GroupCaption>
        <MenuItem href={Pages.APPOINTMENTS_PATH}>
          Upcoming
        </MenuItem>
        <MenuItem href={Pages.PAST_APPOINTMENTS_PATH}>
          Past
        </MenuItem>
        <Separator />
        {/* <GroupCaption>
          Rewards
        </GroupCaption>
        <MenuItem href={Pages.APPOINTMENTS_PATH}>
          Snailz points
        </MenuItem>
        <MenuItem href={Pages.APPOINTMENTS_PATH}>
          Snailz credit
        </MenuItem>
        <MenuItem href={Pages.APPOINTMENTS_PATH}>
          Salon cards
        </MenuItem>
        <Separator /> */}
        <MenuItem onClick={logOut}>
          <b>Log out</b>
        </MenuItem>
      </ContentGroup>
    </Menu>
  )
}

export default ProfileMobileMenu
