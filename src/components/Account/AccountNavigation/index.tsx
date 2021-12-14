import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useApp from 'core/hooks/useApp'
import HiddenOn from 'components/HiddenOn'
import PureButton from 'components/PureButton'
import Text from 'components/Text'
import Section from './components/Section'
import Item from './components/Item'
import styles from './AccountNavigation.module.scss'

interface IProps {
  activeItem: 'profile' | 'payment' | 'upcoming' | 'past';
}

const b = stylesBlock(styles)

const AccountNavigation: React.FC<IProps> = ({ activeItem }) => {
  const { logOut } = useApp()
  
  return (
    <HiddenOn tablet mobile>
      <div className={b('navigation')}>
        <Section title='Account'>
          <Item active={activeItem === 'profile'} href='/account/profile'>Profile</Item>
          <Item active={activeItem === 'payment'} href='/account/cards'>Payment methods</Item>
        </Section>
        <Section title='Appointments'>
          <Item active={activeItem === 'upcoming'} href='/account/upcoming'>Upcoming</Item>
          <Item active={activeItem === 'past'} href='/account/past'>Past</Item>
        </Section>
        <PureButton className={b('button')} onClick={logOut}>
          <Text className={b('log-out')}>Log out</Text>
        </PureButton>
      </div>
    </HiddenOn>
  )
}

export default AccountNavigation
