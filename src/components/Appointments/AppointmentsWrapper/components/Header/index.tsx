import React from 'react'
import stylesBlock from 'utils/stylesBlock'
import useMediaQueries from 'hooks/useMediaQueries'
import Text from 'components/Text'
import RouterLink from 'components/RouterLink'
import styles from './Header.module.scss'

interface IProps {
  currentTab: 'upcoming' | 'past';
}

const b = stylesBlock(styles)

const Header: React.FC<IProps> = ({ currentTab }) => {
  const { isSmallScreen } = useMediaQueries()

  if (!isSmallScreen) { return (<Text className={b('header')} variant='h6'>{ currentTab }</Text>) }

  return (
    <div className={b('tabs')}>
      <RouterLink
        className={b('tab', { active: currentTab === 'upcoming' })}
        href='upcoming'
      >
        Upcoming
      </RouterLink>
      <RouterLink
        className={b('tab', { active: currentTab === 'past' })}
        href='past'
      >
        Past
      </RouterLink>
    </div>
  )
}

export default Header
