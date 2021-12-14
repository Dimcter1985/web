import { FOR_SALONS_PATH, REWARDS_PATH, GIFT_CARD_PATH, SEARCH_PATH } from 'consts/pages'
import { BLOG_PATH } from 'consts'
import VisibleOn from 'components/VisibleOn'

import ProfileButton from './widgets/ProfileButton'
import ProfileButtonMobile from './widgets/ProfileButtonMobile'
import HeaderMenuButton from './widgets/HeaderMenuButton'
import HeaderMobileMenu from './widgets/HeaderMobileMenu'
import ProfileMobileMenu from './widgets/ProfileMobileMenu'
import Container, { IProps as IContainerProps } from './components/Container'
import Group from './components/Group'
import NavItem from './components/NavItem'
import HeaderLogo from './components/HeaderLogo'
import HeaderNav from './components/HeaderNav'

interface IProps {
  container?: IContainerProps
}

const Header: React.FC<IProps> = ({ container }) => {
  return (
    <Container {...container}>
      <Group>
        <HeaderNav>
          <VisibleOn mobile tablet>
            <HeaderMenuButton />
          </VisibleOn>
          <NavItem href={SEARCH_PATH}>
            search
          </NavItem>
          <NavItem href={REWARDS_PATH}>
            rewards
          </NavItem>
          <NavItem href={GIFT_CARD_PATH}>
            gift cards
          </NavItem>
          {/* <NavItem href={HOW_SNAILZ_WORKS_PATH}>
            about
          </NavItem> */}
          <HeaderLogo />
          <NavItem href={FOR_SALONS_PATH}>
            for salons
          </NavItem>
          <NavItem external href={BLOG_PATH}>
            blog
          </NavItem>
          <ProfileButton />
          <ProfileButtonMobile />
        </HeaderNav>
        <VisibleOn mobile tablet>
          <HeaderMobileMenu />
          <ProfileMobileMenu />
        </VisibleOn>
      </Group>
    </Container>
  )
}

export default Header
