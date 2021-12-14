import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import AccountLayout from 'components/Account/AccountLayout'
import AccountNavigation from 'components/Account/AccountNavigation'
import Header from './components/Header'
import styles from './AppointmentsWrapper.module.scss'

interface IProps {
  currentTime: 'upcoming' | 'past';
}

const b = stylesBlock(styles)

const AppointmentsWrapper: React.FC<IProps> = ({ currentTime, children }) => (
  <AccountLayout>
    <AccountNavigation activeItem={currentTime} />
    <div className={b('wrapper')}>
      <Header currentTab={currentTime} />
      { children }
    </div>
  </AccountLayout>
)

export default AppointmentsWrapper
